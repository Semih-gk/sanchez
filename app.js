const Discord = require('discord.js');
const client = new Discord.Client()
global.client = client;
const fetch = require("node-fetch");
const prefix = '-';
const TicTacToe = require('discord-tictactoe');
const { resolve } = require('node-superfetch');
const disbut = require('discord-buttons')(client);


const helpembed = new Discord.MessageEmbed()
    .setColor('#ffc83d')
    .setTitle('Semix Together')
    .setURL('')
    .setDescription("Arkadaşlarınla youtube videosu izle, balık tut ve ya among us oyna!")
    .setThumbnail('https://i.pinimg.com/236x/5c/c8/96/5cc896d2566039c2d77f40f46a27e4a1.jpg')
    .setImage('')
    .setFooter('Sanchéz', 'https://i.pinimg.com/736x/89/c8/c5/89c8c5c03ccfca10a4952605cffab2df.jpg')
    .addField("Hakkımda.", "```Yardım mı lazım?```****-bilgi**** *Yardım gönderir.*\n ****-stats**** *Bot Hakkında bilgi edin.* \
```Komutlar```****-youtube**** *Arkadaşlarınla youtube videosu izle!*\n****-poker**** *Biraz poker oynamaya ne dersin?*\n****-betrayal**** *Among us Discord versiyonunu denemek ister misin?*\n****-fishing**** *Arkadaşlarınla balık tut!*\n****-xox**** Sanchez ile tic tac toe oynamaya ne dersin? Ve ya bir arkadaşını etiketleyerek onunla oyna. Hemen dene!\n \n> • <@274547311302934529>\n \n\
", true)

let bttn = new disbut.MessageButton()
            .setStyle('url') 
            .setLabel('Botu Sunucuna Davet Et') 
            .setID('click_to_function') 
            .setURL('https://is.gd/sanch')
            let bttn2 = new disbut.MessageButton()
            .setStyle('url') 
            .setLabel('Proje sahibine mesaj yolla!') 
            .setID('click_to_function') 
            .setURL('https://instagram.com/semihunwin');


client.on('ready', () => {
    console.log(`Giriş yapıldı. ${client.user.tag}`);
    client.user.setActivity("-bilgi", {
        type: "WATCHING"
    });
});



client.on('ready', () => {
    client.ws.on('INTERACTION_CREATE', async interaction => {
        
        let name = interaction.data.custom_id

        let GameMap = new Map([
            ["buttonveteran","853345170040422470"],
        ])

        let member = await client.guilds.cache.get("808712071628980260").members.fetch(interaction.member.user.id)
        if(!GameMap.has(name) || !member) return;

        let role = GameMap.get(name)
        let returnText;

        if(member.roles.cache.has(role)){
            await member.roles.remove(role)
            returnText = `Zort.`
        }else{
            await member.roles.add(role)
            returnText = `Zart.`

        }
        
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: returnText,
                    flags: "64" // Gizli reply atmak için girmeniz gereken flag
                }
            }
        })
        
    });
});
client.api.channels("853347551007998004").messages.post({ data: {"content":"Bu buton 3 dakika sonra silinecektir. Rolu almak için butona bir kez tıkla! 2. defa tıklarsan rol alma hakkını kaybedeceksin.","components":[{"type":1,"components":[

{"type":2,"style":3,"custom_id":"buttonveteran","label":"Bas Ampüle AmQ"},


]}]}})


client.on('message', async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    var args = message.content.match(/[^_\W]+/g);
    args = (args == null) ? "" : args.join(' ').toLowerCase().trim().split(/ +/g);
    var cmd = (args != "" && message.content.charAt(0) === prefix) ? args.shift() : false;
    

  

    if (cmd === `youtube`) {
        if (!message.channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("❌ | Gerekli izine sahip değilsin: `Create Invite`");
        if (!message.member.voice.channel) return message.channel.send("Bu komutu kullanmak için bir ses kanalına katılmalısınız.")
        fetch(`https://discord.com/api/v8/channels/${message.member.voice.channelID}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913", // youtube together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(data => {
           message.channel.send(` <:verif:833738228304707595>   **Youtube Together Hazır!**\n<:info:833738228024475708> Partiye katılmak ve arkadaşlarınızı davet etmek için Yönlendirme bağlantısını kullanın.\n\nBağlantı: https://discord.gg/${data.code} `);
              }).catch(e => {
            message.channel.send("❌ | Başlatılamadı **YouTube Together**!");
        })
    }

    if (cmd === `poker`) {
        if (!message.member.voice.channel) return message.channel.send("Bu komutu kullanmak için bir ses kanalına katılmalısınız.")
        fetch(`https://discord.com/api/v8/channels/${message.member.voice.channelID}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755827207812677713", // poker together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(data => {
            message.channel.send(` <:verif:833738228304707595>   **Demek Poker oynamak istiyorsun <:supper:796234976965427230> !**\n<:info:833738228024475708> Partiye katılmak ve arkadaşlarınızı davet etmek için Yönlendirme bağlantısını kullanın.\n\nBağlantı: https://discord.gg/${data.code} `);
        }).catch(e => {
            message.channel.send("❌ | Başlatılamadı **Poker Night**!");
        })
    }
    

    if (cmd === `betrayal`) {
        if (!message.member.voice.channel) return message.channel.send("Bu komutu kullanmak için bir ses kanalına katılmalısınız.")
        fetch(`https://discord.com/api/v8/channels/${message.member.voice.channelID}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "773336526917861400", // betrayal together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(data => {
           message.channel.send(`	<:verif:833738228304707595>   **Bu oyunda arkadaşların aslında göründüğü kadar masum olmayacak. Dikkat et dostum! <a:lan:799661609895067659>  **\n<:info:833738228024475708> Partiye katılmak ve arkadaşlarınızı davet etmek için Yönlendirme bağlantısını kullanın.\n\nBağlantı: https://discord.gg/${data.code} `);
        }).catch(e => {
            message.channel.send("❌ | Başlatılamadı **Betrayal.io**!");
        })
    }
    

    if (cmd === `fishing`) {
        if (!message.member.voice.channel) return message.channel.send("Bu komutu kullanmak için bir ses kanalına katılmalısınız.")
        fetch(`https://discord.com/api/v8/channels/${message.member.voice.channelID}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "814288819477020702", // fishing together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(data => {
          message.channel.send(` <:verif:833738228304707595>   **Günün stresini üzerinden atmak için balık tutmak mı istiyorsun? Doğru yerdesin dostum! Bol şans.. <:okk:796234981167988746>  **\n<:info:833738228024475708> Partiye katılmak ve arkadaşlarınızı davet etmek için Yönlendirme bağlantısını kullanın.\n\nBağlantı: https://discord.gg/${data.code}  `);
        }).catch(e => {
            message.channel.send("❌ | Başlatılamadı **Fishington.io**!");
        })
    }

    

    if (cmd === `bilgi`) {
        if (!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.send("❌ | Gerekli izine sahip değilsin: `EMBED_LINKS`");
        message.channel.send('Yardım Menüsü',{buttons: [bttn,bttn2] ,embed: helpembed });    }



    if (cmd === `stats`) {
        guildcount = client.guilds.cache.size
        membercount = client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString() 
        channelcount = client.channels.cache.size
        let statsembed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Semix Together')
            .setURL('')
            .addFields(
                { name: '> Server',  value: (`> **${guildcount}**`), inline: true },
                { name: '> Kullanıcı', value: (`> **${membercount}**`), inline: true },
                { name: '> Kanal', value: (`> **${channelcount}**`), inline: true },
                { name: '> Ping Değeri', value: (`> **${client.ws.ping}**`), inline: true },
                { name: '> Proje Başlangıç Tarihi', value: (`> **18 Nisan 2021 | 18:04**`), inline: true },
                { name: '> Proje Sahibi', value: (`> <@274547311302934529> `), inline: true },


            )
            .setFooter('Sanchéz Stats', '')
            let btn = new disbut.MessageButton()
            .setStyle('url') 
            .setLabel('Botu Sunucuna Davet Et')
            .setID('click_to_function') 
            .setURL('https://is.gd/sanch')
            let btn2 = new disbut.MessageButton()
            .setStyle('url') 
            .setLabel('Proje sahibine mesaj yolla!') 
            .setID('click_to_function') 
            .setURL('https://instagram.com/semihunwin')
        message.channel.send('İstatistikler',{buttons: [btn,btn2] ,embed: statsembed });
    }
});


require('./inlinereply.js')
client.on('message', msg => { if (msg.content === "sa") { msg.inlineReply('as kardesim nasisin') } } )
client.on('message', msg => { if (msg.content === "iyiyim knk") { msg.inlineReply('süpersin knk') } } )
client.on('message', msg => { if (msg.content === "31") { msg.inlineReply('sjsjsjsj cok komik amk cocu seni') } } )


const game = new TicTacToe({ language: 'en' })

client.on('message', message => {
  if (message.content.startsWith('-xox')) {
    game.handleMessage(message);
  }
});

client.on("ready", () => {
  client.api.applications(client.user.id).commands.post({data: {
      name: 'youtube',
      description: 'Arkadaşlarınla Youtube Together izle!'
  }})
});

client.ws.on('INTERACTION_CREATE', async interaction => {
  const command = interaction.data.name.toLowerCase();
  
  if (command == 'youtube'){
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: "Şuan da her şey tam olarak yolunda gitmiyor. Tamamen düzenlendiğinde tekrar dene!"
        }
      }
    })
  }
});



client.login('Token-buraya');

