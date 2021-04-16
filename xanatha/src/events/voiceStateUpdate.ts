import { Disclosure, DiscordEvent } from 'disclosure-discord';
import { VoiceState, MessageEmbed } from 'discord.js';
import { Colors } from '../utils/Constants';
import Handlers from '../functions/Handlers';

export default class extends DiscordEvent {

    constructor(client: Disclosure) {
        super(client, 'voiceStateUpdate');
    }

    async exec(oldState: VoiceState, newState: VoiceState) {

        if (this.client.managers.blacklist.getServer(newState.guild.id) ||
            this.client.managers.blacklist.getUser(newState.guild.ownerID)) {
            return;
        }

        const guild = await this.client.managers.guilds.fetch(newState.guild.id, newState.guild.name);

        if (guild.logging_enabled) {

            const embed = new MessageEmbed()
                .setColor(Colors.gray)
                .setTimestamp()
                .setTitle(`Voice State Update`);

            if (oldState.channel && newState.channel && guild.logging_member_voice_move) {
                embed.setDescription(`<@${newState.member.id}> moved to \`${newState.channel.name}\` from \`${oldState.channel.name}\``);
            } else if (newState.channel && guild.logging_member_voice_join) {
                embed.setDescription(`<@${newState.member.id}> joined \`${newState.channel.name}\``);
            } else if (oldState.channel && guild.logging_member_voice_leave) {
                embed.setDescription(`<@${newState.member.id}> left \`${newState.channel.name}\``);
            }

            let value = '';

            if (oldState.deaf !== newState.deaf && guild.logging_member_voice_deafen) {
                value = newState.deaf ? 'Deafen' : 'Undeafen';
            } else if (oldState.mute !== newState.mute && guild.logging_member_voice_muted) {
                value = newState.mute ? 'Muted' : 'Unmuted';
            } else if (oldState.serverDeaf !== newState.serverDeaf && guild.logging_member_voice_server_deafen) {
                value = newState.serverDeaf ? 'Server Deafen' : 'Server Undeafen';
            } else if (oldState.serverMute !== newState.serverMute && guild.logging_member_voice_server_muted) {
                value = newState.serverMute ? 'Server Muted' : 'Server Unmuted';
            }

            if (value.length) {
                embed.addField('Status', value, true);
            }

            if (guild.logging_member_voice_move ||
                guild.logging_member_voice_join ||
                guild.logging_member_voice_leave ||
                guild.logging_member_voice_deafen ||
                guild.logging_member_voice_muted ||
                guild.logging_member_voice_server_deafen ||
                guild.logging_member_voice_server_muted
            ) {
                await Handlers.logging(this.client, embed, newState.guild, guild);
            }
        }

    }

}