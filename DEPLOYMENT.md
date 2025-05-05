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
       DOMAIN: 'https://your-frontend-domain.vercel.app', // Update with your Vercel app URL
       API_DOMAIN: 'https://your-render-api-domain.onrender.com', // Update with your Render API URL
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