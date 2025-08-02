# Environment Configuration Guide

This document explains how to configure and run the Avni Camp webapp against different environments.

## Architecture Overview

```
Camp Webapp → Remote Server (Login)
     ↓
Camp Webapp → Local Server (Store token + Sync operations)
     ↓  
Local Server → Remote Server (Authenticated sync requests)
```

## Available Environments

### 1. Local Development (Default)
- **Auth Target**: Local development server
- **Sync Target**: Local Avni server (`http://localhost:8021`)
- **Config File**: `.env.development`
- **Command**: `npm run dev:local`

### 2. Prerelease Environment  
- **Auth Target**: Prerelease server (`https://prerelease.avniproject.org`)
- **Sync Target**: Local Avni server (`http://localhost:8021`)
- **Config File**: `.env.prerelease` 
- **Command**: `npm run dev:prerelease`

## Authentication Flow

1. **Login**: Camp webapp → Remote server (`/api/user/generateToken`)
2. **Store Token**: Camp webapp → Local server (`/api/camp/auth/store`)
3. **Sync Operations**: Camp webapp → Local server → Remote server (with stored token)

## Usage

### Run against Prerelease Authentication
```bash
npm run dev:prerelease
```

### Run against Local Authentication (if available)
```bash
npm run dev:local
```

## Environment Files

- `.env.development` - Local development settings
- `.env.prerelease` - Prerelease environment settings  
- `.env.local` - Personal overrides (not committed to git)

## Configuration Variables

- `VITE_API_BASE_URL` - Base URL for the remote authentication server

## Authentication

1. User logs in through camp webapp
2. Webapp gets auth token from remote server
3. Auth token is stored in local server for sync operations
4. Local server automatically includes auth token in remote requests

## Proxy Configuration

- `/api/user/generateToken` → Remote server (for authentication)
- `/api/camp/*` → Local server (for sync operations)
- `/api/sync/*` → Local server (compatibility endpoints)