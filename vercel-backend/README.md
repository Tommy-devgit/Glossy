# Glossy Vercel Backend

This is a Vercel-deployable copy of the existing `server` API. The original `server` directory is unchanged.

## Routes

- `GET /health`
- `POST /api/admin/verify`
- `GET /api/works`
- `POST /api/works`
- `PATCH /api/works/:id`
- `DELETE /api/works/:id`

## Local Development

```bash
cd vercel-backend
npm install
npm run dev
```

Copy `.env.example` to `.env` locally, then fill in MongoDB, Cloudinary, `ADMIN_KEY`, and `CLIENT_ORIGIN`.

## Vercel Deployment

Create a new Vercel project with `vercel-backend` as the root directory.

Set these environment variables in Vercel:

- `MONGODB_URI`
- `MONGODB_TIMEOUT_MS`
- `DNS_SERVERS`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `ADMIN_KEY`
- `CLIENT_ORIGIN`

After deployment, set the frontend `NEXT_PUBLIC_API_URL` to the Vercel backend URL, for example:

```env
NEXT_PUBLIC_API_URL=https://your-vercel-backend.vercel.app
```
