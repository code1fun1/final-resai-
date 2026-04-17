module.exports = {
  source: {
    include: ['./src'],
    exclude: ['node_modules', '.next']
  },
  plugins: ['plugins/markdown'],
  templates: {
    cleverLinks: true,
    monospaceLinks: true
  },
  opts: {
    recurse: true,
    destination: './docs'
  }
};
