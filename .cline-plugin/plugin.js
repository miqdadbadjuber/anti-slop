// Cline picks up the skills/ folder beside package.json by itself, so this plugin
// registers nothing. It exists to give the manifest an entry point to resolve.
export default {
  name: 'antislop',
  manifest: { capabilities: ['skills'] },
}
