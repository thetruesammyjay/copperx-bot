# Troubleshooting Guide

## 1. Bot Not Responding
- Ensure the bot is running by checking the logs.
- Verify that the `TELEGRAM_BOT_TOKEN` is correct in the `.env` file.

## 2. Authentication Issues
- Ensure the email and OTP are correct.
- Check the logs for any errors during the authentication process.

## 3. API Errors
- Verify that the `COPPERX_API_BASE_URL` is correct.
- Check the API response in the logs for more details.

## 4. Pusher Notifications Not Working
- Ensure the Pusher credentials (`key`, `secret`, `cluster`) are correct.
- Verify that the bot is subscribed to the correct channel (`private-org-${organizationId}`).

## 5. Deployment Issues
- Ensure all environment variables are set in the deployment platform.
- Check the deployment logs for errors.