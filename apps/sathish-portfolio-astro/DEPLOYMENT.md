# Deployment Guide - Astro Portfolio

This guide will help you deploy your Astro portfolio to Vercel (recommended) or other platforms.

## Prerequisites

- Git repository pushed to GitHub/GitLab/Bitbucket
- Vercel account (free - sign up at https://vercel.com)

---

## Option 1: Deploy to Vercel (Recommended)

### Method A: Via Vercel Dashboard (Easiest)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Visit https://vercel.com
   - Click "Sign Up" or "Login" (use GitHub for easy integration)
   - Click "Add New Project"
   - Import your `sathish-nx` repository

3. **Vercel will auto-detect the configuration** from `vercel.json`:
   - Build Command: `npx nx build sathish-portfolio-astro`
   - Output Directory: `apps/sathish-portfolio-astro/dist`
   - Install Command: `npm install`

4. **Click "Deploy"** - Your site will be live in ~2 minutes!

5. **Get your URL**: Vercel provides a URL like `your-project.vercel.app`

### Method B: Via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy** (from project root):
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

5. **Production deployment**:
   ```bash
   vercel --prod
   ```

### Setting up Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

---

## Option 2: Deploy to Netlify

1. **Create `netlify.toml`** in the root of `sathish-nx`:
   ```toml
   [build]
     base = "apps/sathish-portfolio-astro"
     command = "cd ../.. && npx nx build sathish-portfolio-astro"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**:
   - Visit https://netlify.com
   - "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Netlify will use `netlify.toml` configuration
   - Click "Deploy"

---

## Option 3: Deploy to GitHub Pages

1. **Install Astro GitHub Pages adapter**:
   ```bash
   npm install --save-dev @astrojs/adapter-static
   ```

2. **Create GitHub Actions workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4

         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'

         - name: Install dependencies
           run: npm ci

         - name: Build with Nx
           run: npx nx build sathish-portfolio-astro

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: apps/sathish-portfolio-astro/dist

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Save

4. **Push to trigger deployment**:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

---

## Testing Your Build Locally

Before deploying, test your build locally:

```bash
# Build the project
npx nx build sathish-portfolio-astro

# Preview the build
npx nx preview sathish-portfolio-astro
```

Visit http://localhost:4173 to see your production build.

---

## Environment Variables (If Needed)

If your app uses environment variables:

### For Vercel:
1. Dashboard → Project Settings → Environment Variables
2. Add your variables (e.g., `API_KEY`, `DATABASE_URL`)
3. Redeploy

### For Netlify:
1. Site Settings → Environment Variables
2. Add your variables
3. Redeploy

---

## Automatic Deployments

Both Vercel and Netlify support automatic deployments:

- **Push to `main`** → Automatic production deployment
- **Push to other branches** → Preview deployments
- **Pull Requests** → Deploy previews for testing

---

## Troubleshooting

### Build fails on Vercel/Netlify

1. Check build logs in dashboard
2. Ensure all dependencies are in `package.json`
3. Test build locally: `npx nx build sathish-portfolio-astro`
4. Check Node.js version (should be 18+ for Astro 5)

### 404 errors on routes

- Make sure `output: 'static'` is set in `astro.config.mjs`
- Check that `build.format: 'directory'` is configured

### Styling issues

- Verify all CSS/Tailwind imports are correct
- Check browser console for errors
- Test locally with production build

---

## Performance Tips

1. **Enable Vercel Analytics** (free):
   - Dashboard → Analytics → Enable

2. **Optimize images**:
   - Use Astro's `<Image>` component
   - Compress images before deployment

3. **Enable compression**:
   - Both Vercel and Netlify enable gzip/brotli by default

---

## Monitoring Your Site

### Vercel:
- Built-in analytics and monitoring
- View deployment logs
- Real-time error tracking

### Netlify:
- Built-in analytics
- Deploy notifications
- Form handling (if needed)

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Astro Docs: https://docs.astro.build
- Nx Docs: https://nx.dev

---

## Recommendation

**Use Vercel** for the best experience with Astro and Nx:
- Zero configuration
- Fastest deployments
- Best performance
- Free SSL certificates
- Automatic HTTPS
- Built-in CDN
- Great developer experience

Happy deploying! 🚀
