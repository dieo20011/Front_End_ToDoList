# Deployment Guide

## Environment Configuration

This Angular project uses different environment configurations for development and production:

- **Development**: Uses `src/environments/environment.ts` with your local API endpoint
- **Production**: Uses `src/environments/environment.prod.ts` with your Render API endpoint

## Steps to Deploy to Vercel and Configure Render API

1. **Update the API endpoint in production environment**

   Edit `src/environments/environment.prod.ts` to set your actual Render API URL:

   ```typescript
   export const environment = {
       production: true,
       DOMAIN: 'https://todolist-angular-tau.vercel.app',
       API_DOMAIN: 'https://todolist-fs.onrender.com',
       API_NEW_KEY: 'b810a73fabed4ec187bff9e8165571cd',
   };
   ```

2. **Build the application for production**

   ```bash
   ng build --configuration=production
   ```

   This will use the production environment file with the Render API domain.

3. **Deploy to Vercel**

   - Push your code to GitHub
   - Connect your GitHub repository to Vercel
   - Set the build command in Vercel to: `ng build --configuration=production`
   - Set the output directory to: `dist/todolist-fe`
   - In the Vercel project settings, set the Framework Preset to "Angular"

## Fixing the "/sockjs-node/iframe.html" Error

If you're seeing errors about missing "/sockjs-node/iframe.html", this is because sockjs is a development-only feature for hot reloading. To fix this:

1. Make sure you're using the production build configuration:
   ```
   ng build --configuration=production
   ```

2. In your Vercel deployment settings:
   - Set the build command to `ng build --configuration=production`
   - Set Framework Preset to "Angular"
   - Do not use custom development commands like `ng serve`

3. If you still see the error in your Vercel logs, add this to your `vercel.json` file at the root of your project:

   ```json
   {
     "rewrites": [
       { "source": "/sockjs-node/(.*)", "destination": "/404.html" }
     ]
   }
   ```

## How It Works

- Angular's file replacement feature (`fileReplacements` in angular.json) swaps the environment.ts file with environment.prod.ts during production builds
- All API calls will automatically use the Render API domain in production and localhost during development
- The application uses the environment configuration through imports like:
  ```typescript
  import { environment } from 'src/environments/environment';
  ```

## Troubleshooting

- If you encounter CORS issues, make sure your Render backend allows requests from your Vercel domain
- If deployment fails due to budget warnings, you may need to further adjust the budget limits in angular.json 