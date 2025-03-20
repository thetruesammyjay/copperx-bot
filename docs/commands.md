# Command Reference

## Authentication
- `/login <email>`: Log in with your email. An OTP will be sent to your email.
- `/auth <otp>`: Authenticate with the OTP received in your email.
- `/logout`: Log out and clear your session.

## Wallet Management
- `/balance`: Check your wallet balances.

## Fund Transfers
- `/send email <email> <amount>`: Send funds to an email address.
- `/send wallet <address> <amount>`: Send funds to a wallet address.
- `/withdraw <bankAccountId> <amount>`: Withdraw funds to a bank account.

## KYC
- `/kyc`: Check your KYC status.

## Help
- `/help`: Show the list of available commands.