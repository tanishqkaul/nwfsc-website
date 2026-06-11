# North West Fiji Seniors Club — Website

A simple, senior-friendly community website with:

- **Home** — vision, mission, values and the latest news
- **News & Events** — announcements and upcoming events
- **Photos** — a gallery of pictures from club gatherings
- **Our Committee** — names, photos and contact details of committee members
- **Admin page** (`/admin`) — a very simple portal where a committee member can
  publish announcements, upload photos, and update committee profiles. No
  technical knowledge needed.

Built with **Vite + React** and **Supabase** (database, photo storage, admin login).

---

## 1. Run it on your computer (Windows)

You need Node.js installed (download from https://nodejs.org if you don't have it).

Open the folder in a terminal (in the folder, click the address bar, type `cmd`, press Enter) and run:

```
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173).

Until Supabase is connected, the site runs in **preview mode** with sample
content so you can see exactly how it looks.

## 2. Connect Supabase (one-time, ~5 minutes)

1. Go to https://supabase.com and open (or create) a project.
2. In the project, open **SQL Editor**, paste the contents of
   `supabase/migrations/0001_init.sql`, and click **Run**.
   This creates the tables, the photo storage bucket, and the security rules.
3. In the project, go to **Authentication → Users → Add user** and create the
   admin login (an email + password for whoever will update the website).
4. In the project, go to **Settings → API** and copy two things:
   - the **Project URL**
   - the **anon public** key
5. In this folder, copy `.env.example` to a new file named `.env` and paste
   those two values in.
6. Restart `npm run dev`. The site is now live-connected: the admin page at
   `/admin` works with the login you created in step 3.

## 3. Put it on the internet

The easiest free options are **Vercel** or **Netlify**:

1. Push this folder to a GitHub repository.
2. Import the repository on vercel.com (it auto-detects Vite).
3. Add the two environment variables (`VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY`) in the Vercel project settings.
4. Deploy. You'll get a web address you can share with all members.

For page reloads to work on Netlify, add a `_redirects` file in `public/` with:
`/* /index.html 200` (Vercel handles this automatically for Vite SPAs).

## How the admin page works (for committee members)

1. Open the website and click **Committee sign in** at the bottom of the page
   (or go to `/admin`).
2. Sign in with the email and password.
3. Choose one of the three big buttons:
   - **Make an announcement** — type a title and message, optionally pick a
     date for events and attach a picture, press **Publish announcement**.
   - **Add photos** — tap the big box, pick pictures from your computer or
     phone (several at once is fine), press the upload button.
   - **Manage committee** — add a member's name, role, photo and phone number.
4. Everything appears on the public website immediately.

## Moving photos over from the Facebook group

Facebook doesn't allow websites to copy content out of groups automatically.
The quickest way: open the group on your phone or computer, save the photos
you want (tap a photo → Save/Download), then upload them through
**Admin → Add photos**. A batch of 20–30 photos takes a few minutes.
