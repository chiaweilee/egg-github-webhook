export default {
  chainWebpack(config) {
    config.plugins.delete('progress');
  },
};
