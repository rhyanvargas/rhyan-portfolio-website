# Deployment Guide

Production deployment guide for the Rhyan Vargas Portfolio Website.

## Vercel Deployment (Recommended)

The site is optimized for Vercel deployment with automatic builds and deployments.

### Initial Setup

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

2. **Build Configuration**
   ```json
   {
     "buildCommand": "pnpm build",
     "outputDirectory": "out",
     "installCommand": "pnpm install"
   }
   ```

3. **Environment Variables**
   No environment variables required for basic functionality.

### Automatic Deployments

- **Production**: Deploys from `main` branch
- **Preview**: Deploys from feature branches
- **Build Time**: ~2-3 minutes

### Custom Domain Setup

1. Add domain in Vercel dashboard
2. Configure DNS records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

## Alternative Deployment Options

### Netlify

1. **Build Settings**
   ```
   Build command: pnpm build
   Publish directory: out
   ```

2. **netlify.toml Configuration**
   ```toml
   [build]
     command = "pnpm build"
     publish = "out"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Select "GitHub Actions" as source

2. **GitHub Actions Workflow**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'pnpm'
         - run: pnpm install
         - run: pnpm build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

### Self-Hosted

1. **Build the Application**
   ```bash
   pnpm build
   ```

2. **Serve Static Files**
   ```bash
   # Using serve
   npx serve out
   
   # Using nginx
   # Copy out/ contents to nginx web root
   cp -r out/* /var/www/html/
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html;
       index index.html;
   
       location / {
           try_files $uri $uri/ /index.html;
       }
   
       # Cache static assets
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

## Build Optimization

### Production Build

```bash
# Full production build
pnpm build

# Analyze bundle size
pnpm build && npx @next/bundle-analyzer
```

### Performance Optimization

1. **Image Optimization**
   - Use WebP format when possible
   - Compress images before adding to `/public`
   - Consider using Next.js Image component for dynamic optimization

2. **Font Optimization**
   - Fonts are preloaded in `app/layout.tsx`
   - Using Geist font family for optimal performance

3. **Code Splitting**
   - Automatic component-level code splitting
   - Dynamic imports for heavy components if needed

### Build Analysis

```bash
# Bundle analyzer
ANALYZE=true pnpm build

# Build stats
pnpm build --debug
```

## Environment Configuration

### Development vs Production

```typescript
// lib/config.ts
export const config = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://rhyan.dev' 
    : 'http://localhost:3000'
};
```

### Environment Variables (Optional)

```bash
# .env.local (if needed for future features)
NEXT_PUBLIC_SITE_URL=https://rhyan.dev
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Monitoring & Analytics

### Vercel Analytics

Automatically enabled for Vercel deployments:
- Core Web Vitals monitoring
- Page performance metrics
- User experience insights

### Custom Analytics

To add Google Analytics or other tracking:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Deployment Checklist

### Pre-Deployment

- [ ] All content updated in `config/portfolio.ts`
- [ ] Images optimized and added to `/public`
- [ ] Build completes without errors (`pnpm build`)
- [ ] TypeScript compilation passes (`pnpm type-check`)
- [ ] Linting passes (`pnpm lint`)
- [ ] All links tested and working
- [ ] Responsive design tested on multiple devices

### Post-Deployment

- [ ] Site loads correctly on production URL
- [ ] All pages and sections render properly
- [ ] Contact form/links work correctly
- [ ] Social media links are accurate
- [ ] Performance metrics are acceptable
- [ ] SEO meta tags are correct

## Troubleshooting

### Common Build Issues

**Build fails with TypeScript errors:**
```bash
# Check for type errors
pnpm type-check

# Fix auto-fixable issues
pnpm lint --fix
```

**Static export issues:**
```bash
# Ensure next.config.mjs has correct settings
output: 'export',
trailingSlash: true,
images: { unoptimized: true }
```

**Missing dependencies:**
```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Performance Issues

**Large bundle size:**
- Use bundle analyzer to identify large dependencies
- Consider dynamic imports for heavy components
- Optimize images and assets

**Slow loading:**
- Enable compression on hosting platform
- Optimize images (WebP format, proper sizing)
- Review and minimize CSS/JS bundles

### Domain Issues

**Custom domain not working:**
- Verify DNS records are correct
- Check SSL certificate status
- Ensure domain is properly configured in hosting platform

**Redirect issues:**
- Check hosting platform redirect rules
- Verify trailing slash configuration
- Test all internal links

## Rollback Strategy

### Vercel Rollback

1. Go to Vercel dashboard
2. Select deployment to rollback to
3. Click "Promote to Production"

### Git-based Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

## Security Considerations

### HTTPS

- Always use HTTPS in production
- Most hosting platforms provide automatic SSL
- Redirect HTTP to HTTPS

### Content Security

- No sensitive data in client-side code
- All portfolio data is public information
- Regular dependency updates for security patches

### Headers

Recommended security headers:
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

Most hosting platforms provide these automatically.