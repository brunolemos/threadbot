# 👀 Thread Bot
Make people on Slack use threads instead of flooding the channels

<a href="https://slack.com/oauth/authorize?scope=commands,bot&client_id=351867349926.351110503493"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>

---

### TODO

- [x] Show `Thread Bot is typing` whenever someone types so the person remembers to use thread
- [ ] ~Automatically unshare files from channels so comments don't flood the channel~<br/>
    - _Slack API doesn't allow bots do this 😕_
    - _This will be fixed: File comments will work just like threads after July 19th 🎉🎉 ([source](https://api.slack.com/changelog/2018-05-file-threads-soon-tread))_
- [x] `/thread` command to remind everyone in the channel about this Thread Culture
- [x] Action menu on each message so anyone can make the bot reply to a person that is not using threads
- [ ] Distribute app: Make it work for any workspace
