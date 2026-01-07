export const validateEmail = email => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const selectionTools = [
  {
    image: require('../assests/images/x.png'),
    type: 'x',
  },
  {
    image: require('../assests/images/o.png'),
    type: 'o',
  },
];
