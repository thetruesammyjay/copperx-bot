# 🚀 Copperx Telegram Bot 🤖

A Telegram bot for managing Copperx payouts, including wallet balances, fund transfers, and real-time deposit notifications. 💸

---

## ✨ Features
- **🔐 Authentication**: Log in with email and OTP for secure access.
- **💰 Wallet Management**: Check your wallet balances across multiple networks.
- **📤 Fund Transfers**: Send funds to email addresses or wallet addresses.
- **📥 Withdrawals**: Withdraw funds to your bank account.
- **🔔 Real-Time Notifications**: Receive instant deposit notifications using Pusher.
- **📝 KYC Status**: Check your KYC (Know Your Customer) approval status.

---

## 🤖 Bot Link
[CopperX Payment Gateway Bot](https://t.me/CopperXPaymentGatewayBot)

---

## 📜 Commands

Here’s a list of all available commands and their usage:

### **🔐 Authentication**
- **`/login <email>`**: Log in with your **CopperX** registered email. An OTP will be sent to your email.
  - Example: `/login user@example.com`
- **`/auth <otp>`**: Authenticate with the OTP received in your email.
  - Example: `/auth 123456`
- **`/logout`**: Log out and clear your session.

### **💰 Wallet Management**
- **`/balance`**: Check your wallet balances.
  - Example: `/balance`

### **📤 Fund Transfers**
- **`/send email <email> <amount>`**: Send funds to an email address.
  - Example: `/send email user@example.com 100`
- **`/send wallet <address> <amount>`**: Send funds to a wallet address.
  - Example: `/send wallet 0x1234567890abcdef 100`

### **📥 Withdrawals**
- **`/withdraw <bankAccountId> <amount>`**: Withdraw funds to a bank account.
  - Example: `/withdraw 123456789 100`

### **📝 KYC Status**
- **`/kyc`**: Check your KYC approval status.
  - Example: `/kyc`

### **🆘 Help**
- **`/help`**: Display a list of available commands and their usage.
  - Example: `/help`

### **🟢 Bot Status**
- **`/status`**: Check the bot’s status (e.g., running, healthy).
  - Example: `/status`

---

## 🛠️ Getting Started

Follow these steps to set up and run the bot locally.

### **Prerequisites**

- Node.js (v16 or higher) 🟢
- Telegram Bot Token (from [BotFather](https://core.telegram.org/bots#botfather)) 🤖
- Copperx API credentials 🔑
- Pusher credentials (app ID, key, secret, and cluster) 📡

### **Steps**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/thetruesammyjay/copperx-telegram-bot.git
   cd copperx-telegram-bot
2. **Install Dependencies**:
    ```bash
    npm install
    ```
3. **Set Up Environment Variables**:

    Create a **`.env`** file in the root directory and add the following variables:
    ```plaintext
    TELEGRAM_BOT_TOKEN=your-telegram-bot-token
    PUSHER_KEY=your-pusher-key
    PUSHER_CLUSTER=your-pusher-cluster
    COPPERX_API_BASE_URL=https://income-api.copperx.io/api
    ENCRYPTION_KEY=your-secure-encryption-key
    ```
4. **Run the Bot Locally**:
    ```bash
    npm start
    ```
5. **Test the Bot**:
- Use the bot commands in Telegram to test its functionality. 🤖
- Access the health check endpoint at `http://localhost:4000/health`. 🩺

---
##🚀 Deployment

Deploy the bot to a hosting platform for production use.

**Recommended Platforms**
- [Render](render.com)🌐
- [Heroku](heroku.com)🚀

**Steps**

1. Push your code to a GitHub repository. 📂

2. Create a new web service on Render or Heroku and connect your repository. 🔗

3. Set the environment variables in the platform’s dashboard. ⚙️

4. Deploy the bot. 🚀

---
## 📚 Documentation

**For more details, refer to the following documentation** :
- [Setup Instructions](https://github.com/thetruesammyjay/copperx-bot/blob/main/docs/setup.md) 📝
- [API Integration Details](https://github.com/thetruesammyjay/copperx-bot/blob/main/doc/api.md) 🔗
- [Command Reference](https://github.com/thetruesammyjay/copperx-bot/blob/main/doc/commands.md) 📜
- [Troubleshooting Guide](https://github.com/thetruesammyjay/copperx-bot/blob/main/doc/troubleshooting.md) 🛠️
- [Architecture Overview](https://github.com/thetruesammyjay/copperx-bot/blob/main/doc/architecture.md) 🏗️

---
## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository. 🍴

2. Create a new branch for your feature or bugfix. 🌿

3. Submit a pull request with a detailed description of your changes. 📥

---
## 📜 License

This project is licensed under the MIT License.

---
## 📞 Contact Us

For questions or support, reach out to us on [X (formerly Twitter)](x.com/thatbwoysammyj). 🐦

---
