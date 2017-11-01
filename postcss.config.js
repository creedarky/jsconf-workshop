module.exports = ({ file, options, env }) => {
  return {
    plugins: {
      'autoprefixer': env !== 'development',
      'cssnano': env !== 'development'
    }
  };
};
