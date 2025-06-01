/* eslint-disable @typescript-eslint/no-require-imports */
// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Create a user
  const user = {
    id: '679068443c724f57c82bea49',
  };
  console.log('User created: ', user);

  //   // 2. Create DiscordWebhook for the user
  //   const discordWebhook = await prisma.discordWebhook.create({
  //     data: {
  //       webhookId: 'discord-001',
  //       url: 'https://discord.com/api/webhooks/xyz',
  //       name: 'John\'s Discord',
  //       guildName: 'Discord Guild',
  //       guildId: 'guild-001',
  //       channelId: 'channel-001',
  //       user: {
  //         connect: { id: user.id },
  //       },
  //     },
  //   });
  //   console.log('DiscordWebhook created: ', discordWebhook);

  //   // 3. Create Slack integration for the user
  //   const slack = await prisma.slack.create({
  //     data: {
  //       appId: 'slack-app-001',
  //       authedUserId: 'user-slack-001',
  //       authedUserToken: 'token-unique-slack-001',
  //       slackAccessToken: 'access-token-slack-001',
  //       botUserId: 'bot-slack-001',
  //       teamId: 'team-001',
  //       teamName: 'Slack Team',
  //       user: {
  //         connect: { id: user.id },
  //       },
  //     },
  //   });
  //   console.log('Slack created: ', slack);

  // 4. Create AuthorizedOrigin for the user
  //   const authorizedOrigin = await prisma.authorizedOrigin.create({
  //     data: {
  //       origin: 'https://myapp.com',
  //       user: {
  //         connect: { id: user.id },
  //       },
  //     },
  //   });
  //   console.log('AuthorizedOrigin created: ', authorizedOrigin);

  //   // 5. Create a Workflow for the user
  //   const workflow = await prisma.workflow.create({
  //     data: {
  //       title: 'Welcome Campaign',
  //       alertType: 'Email',
  //       campaignId: 'campaign-001',
  //       destination: 'email@example.com',
  //       selectedFields: ['field-1', 'field-2'],
  //       customMessage: 'Hello! Welcome to our service.',
  //       conditions: { minRating: 4, region: 'US' },
  //       publish: true,
  //       user: {
  //         connect: { id: user.id },
  //       },
  //     },
  //   });
  //   console.log('Workflow created: ', workflow);

  // 6. Create a Theme
  const theme = await prisma.theme.create({
    data: {
      primaryColor: '#ff5733',
      secondaryColor: '#33ff57',
      borderRadius: '5px',
    },
  });
  console.log('Theme created: ', theme);

  // 7. Create Feedback for the user with the Theme
  const feedback = await prisma.feedback.create({
    data: {
      title: 'Product Feedback',
      description: 'Feedback on our awesome product.',
      user: {
        connect: { id: user.id },
      },
      theme: theme ? { connect: { id: theme.id } } : undefined,
    },
  });
  console.log('Feedback created: ', feedback);

  // 8. Create a Section associated with the Feedback
  const section = await prisma.section.create({
    data: {
      title: 'General Comments',
      description: 'Tell us what you think!',
      feedback: {
        connect: { id: feedback.id },
      },
      type: 'GENERAL_FEEDBACK', // Enum as string
    },
  });
  console.log('Section created: ', section);

  // 9. Create a FormField for the Section
  const formField = await prisma.formField.create({
    data: {
      label: 'Your Comments',
      type: 'TEXTAREA', // Enum as string
      placeholder: 'Type your comments here...',
      required: true,
      section: {
        connect: { id: section.id },
      },
      order: 1,
      url: 'https://example.com/formfield-help',
    },
  });
  console.log('FormField created: ', formField);

  // 10. Create a Submission for the Feedback
  const submission = await prisma.submission.create({
    data: {
      feedback: {
        connect: { id: feedback.id },
      },
      ipAddress: '127.0.0.1',
      city: 'New York',
      region: 'NY',
      country: 'USA',
      location: '40.7128,-74.0060',
      org: 'Local ISP',
      postalCode: '10001',
      timezone: 'EST',
    },
  });
  console.log('Submission created: ', submission);

  // 11. Create a GuestUser associated with the FormField.
  // (For MongoDB, note that the GuestUser primary key is stored as entityId and is auto-generated.)
  const guestUser = await prisma.guestUser.create({
    data: {
      formField: {
        connect: { id: formField.id },
      },
    },
  });
  console.log('GuestUser created: ', guestUser);

  // 12. Create a Response that ties Submission, Section, and FormField.
  const response = await prisma.response.create({
    data: {
      submission: {
        connect: { id: submission.id },
      },
      section: {
        connect: { id: section.id },
      },
      formField: {
        connect: { id: formField.id },
      },
      answer: 'I love the design and usability!',
    },
  });
  console.log('Response created: ', response);

  // 13. Update Connections: Connect the DiscordWebhook and Slack to a connection record.
  // Here, we create two separate connection documents.
  //   const discordConnection = await prisma.connections.create({
  //     data: {
  //       type: 'discord',
  //       discordWebhook: {
  //         connect: { id: discordWebhook.id },
  //       },
  //       user: {
  //         connect: { id: user.id },
  //       },
  //     },
  //   });
  //   console.log('Discord Connection created: ', discordConnection);

  //   const slackConnection = await prisma.connections.create({
  //     data: {
  //       type: 'slack',
  //       slack: {
  //         connect: { id: slack.id },
  //       },
  //       user: {
  //         connect: { id: user.id },
  //       },
  //     },
  //   });
  //   console.log('Slack Connection created: ', slackConnection);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
