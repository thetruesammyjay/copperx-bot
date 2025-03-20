# API Integration Details

## Copperx API
The bot interacts with the Copperx API for authentication, wallet management, and fund transfers.

### Endpoints
- **Authentication**:
  - `/api/auth/email-otp/request`: Request OTP for login.
  - `/api/auth/email-otp/authenticate`: Authenticate with OTP.
- **Wallet Management**:
  - `/api/wallets/balances`: Fetch wallet balances.
- **Fund Transfers**:
  - `/api/transfers/send`: Send funds to an email.
  - `/api/transfers/wallet-withdraw`: Send funds to a wallet address.
  - `/api/transfers/offramp`: Withdraw funds to a bank account.

### Authentication
- Use the `token` returned from `/api/auth/email-otp/authenticate` for authenticated requests.

---

## Pusher Integration
The bot uses Pusher for real-time deposit notifications.

### Setup
1. Create a Pusher app and obtain your credentials (`appId`, `key`, `secret`, and `cluster`).
2. Update the `.env` file with your Pusher credentials.

### Channels
- **Private Channels**: Notifications are sent to `private-org-${organizationId}`.

### Events
- **Deposit Event**: Triggered when a deposit is received.
  - Data: `{ amount: string, network: string, transactionId: string }`