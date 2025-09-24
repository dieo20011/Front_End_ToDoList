import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PomodoroSettings {
  workTime: number; // in minutes
  shortBreak: number; // in minutes
  longBreak: number; // in minutes
  longBreakInterval: number; // number of work sessions before long break
}

@Component({
  selector: 'app-promodo-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './promodo-management.component.html',
  styleUrl: './promodo-management.component.scss'
})
export class PromodoManagementComponent implements OnInit, OnDestroy {
  // Timer state
  timeLeft = signal(25 * 60); // 25 minutes in seconds
  isRunning = signal(false);
  isPaused = signal(false);
  currentSession = signal<'work' | 'shortBreak' | 'longBreak'>('work');
  sessionCount = signal(0);
  
  // Settings
  settings = signal<PomodoroSettings>({
    workTime: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4
  });
  
  // Audio
  private audioContext: AudioContext | null = null;
  private backgroundMusic: any = null;
  isMusicPlaying = signal(false);
  
  // Timer interval
  private timerInterval: any = null;
  
  ngOnInit() {
    this.initializeAudio();
    this.updateTimerDisplay();
  }
  
  ngOnDestroy() {
    this.stopTimer();
    this.stopBackgroundMusic();
  }
  
  // Audio initialization
  private async initializeAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported');
    }
  }
  
  // Background music methods
  async playBackgroundMusic() {
    if (!this.audioContext) return;
    
    try {
      // Create a simple ambient sound using Web Audio API
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime); // A3 note
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 2);
      
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 2);
      
      this.backgroundMusic = oscillator as any;
      this.isMusicPlaying.set(true);
    } catch (error) {
      console.warn('Could not play background music:', error);
    }
  }
  
  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop();
      this.backgroundMusic = null;
    }
    this.isMusicPlaying.set(false);
  }
  
  // Timer methods
  startTimer() {
    if (this.isPaused()) {
      this.resumeTimer();
      return;
    }
    
    this.isRunning.set(true);
    this.isPaused.set(false);
    this.playBackgroundMusic();
    
    this.timerInterval = setInterval(() => {
      const currentTime = this.timeLeft();
      if (currentTime <= 0) {
        this.completeSession();
        return;
      }
      this.timeLeft.set(currentTime - 1);
    }, 1000);
  }
  
  pauseTimer() {
    this.isRunning.set(false);
    this.isPaused.set(true);
    this.stopTimer();
    this.stopBackgroundMusic();
  }
  
  resumeTimer() {
    this.isRunning.set(true);
    this.isPaused.set(false);
    this.playBackgroundMusic();
    
    this.timerInterval = setInterval(() => {
      const currentTime = this.timeLeft();
      if (currentTime <= 0) {
        this.completeSession();
        return;
      }
      this.timeLeft.set(currentTime - 1);
    }, 1000);
  }
  
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.isRunning.set(false);
    this.isPaused.set(false);
    this.stopBackgroundMusic();
  }
  
  resetTimer() {
    this.stopTimer();
    this.updateTimerDisplay();
  }
  
  completeSession() {
    this.stopTimer();
    this.playNotificationSound();
    
    if (this.currentSession() === 'work') {
      const newCount = this.sessionCount() + 1;
      this.sessionCount.set(newCount);
      
      if (newCount % this.settings().longBreakInterval === 0) {
        this.currentSession.set('longBreak');
        this.timeLeft.set(this.settings().longBreak * 60);
      } else {
        this.currentSession.set('shortBreak');
        this.timeLeft.set(this.settings().shortBreak * 60);
      }
    } else {
      this.currentSession.set('work');
      this.timeLeft.set(this.settings().workTime * 60);
    }
  }
  
  private playNotificationSound() {
    if (!this.audioContext) return;
    
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Play a pleasant notification sound
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime + 0.2);
      
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
      
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.5);
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }
  
  private updateTimerDisplay() {
    const session = this.currentSession();
    switch (session) {
      case 'work':
        this.timeLeft.set(this.settings().workTime * 60);
        break;
      case 'shortBreak':
        this.timeLeft.set(this.settings().shortBreak * 60);
        break;
      case 'longBreak':
        this.timeLeft.set(this.settings().longBreak * 60);
        break;
    }
  }
  
  // Format time display
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Expose Math for template
  Math = Math;
  
  // Get session display name
  getSessionName(): string {
    switch (this.currentSession()) {
      case 'work': return 'Work Time';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
      default: return 'Work Time';
    }
  }
  
  // Get progress percentage
  getProgress(): number {
    const session = this.currentSession();
    let totalTime: number;
    
    switch (session) {
      case 'work':
        totalTime = this.settings().workTime * 60;
        break;
      case 'shortBreak':
        totalTime = this.settings().shortBreak * 60;
        break;
      case 'longBreak':
        totalTime = this.settings().longBreak * 60;
        break;
      default:
        totalTime = this.settings().workTime * 60;
    }
    
    return ((totalTime - this.timeLeft()) / totalTime) * 100;
  }
  
  // Update settings
  updateSettings(newSettings: Partial<PomodoroSettings>) {
    this.settings.set({ ...this.settings(), ...newSettings });
    if (!this.isRunning()) {
      this.updateTimerDisplay();
    }
  }
}
