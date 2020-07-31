#!/usr/bin/env node
const yargs = require('yargs')
const ytdl = require('ytdl-core')
const prism = require('prism-media')

const options = yargs
.usage('Usage: -ytdl <url> -af <array>')
.option("ytdl",{alias:'url',describe:'url of ytdl',type:"string",demandOption:true})
.option("af",{alias:'audioFilters',describe:'Filters of ffmpeg',type:"string"})
.argv
let ffmpegargs = [
        '-analyzeduration', '0',
       '-loglevel', '0',
        '-f', 'mp3',
        '-ar', '48000',
        '-ac', '2',
      ]
let stream = ytdl(options.url)

if(options.audioFilters && Array.isArray(options.audioFilters)){
ffmpegargs = ffmpegargs.concat(options.audioFilters)
const FFmpeg = new prism.FFmpeg({args:ffmpegargs})
stream = stream.pipe(FFmpeg)
}
console.log(stream)

