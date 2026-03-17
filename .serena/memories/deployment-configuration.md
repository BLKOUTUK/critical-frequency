# Mental Health Briefing Deployment Configuration

## Critical Facts

**Project Path**: `/home/robbe/mental-health-briefing`
**Hosting Platform**: Vercel (NOT Railway)
**Correct Deploy Directory**: `/home/robbe/mental-health-briefing/mental-health-campaign/`

## Deployment Method

```bash
cd /home/robbe/mental-health-briefing/mental-health-campaign
vercel --prod --yes
```

## Directory Structure

```
/home/robbe/mental-health-briefing/
├── index.html                    ❌ OLD invoice page - DO NOT DEPLOY
├── vercel.json                   ✅ Config file - specifies correct output dir
├── DEPLOYMENT-CHECKLIST.md       ✅ Full deployment guide
└── mental-health-campaign/       ✅ CORRECT site to deploy
    ├── index.html                ✅ Campaign homepage "Without community..."
    ├── public/                   ✅ All briefing pages
    └── admin.html                ✅ Admin panel
```

## Safeguards Created (2025-11-01)

1. **vercel.json**: Specifies `outputDirectory: "mental-health-campaign"`
2. **DEPLOYMENT-CHECKLIST.md**: Complete pre/post deployment verification steps
3. **Serena memory**: This document for future reference

## Previous Incident

Deployed from root directory by mistake, which deployed the old invoice page. Fixed by redeploying from correct subdirectory and adding safeguards.
