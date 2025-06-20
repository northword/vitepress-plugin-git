import { createLogger } from 'vite'

export const PLUGIN_NAME = 'vitepress-plugin-git'
export const logger = createLogger(undefined, { prefix: PLUGIN_NAME })
