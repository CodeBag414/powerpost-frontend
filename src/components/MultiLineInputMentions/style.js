export default ({
  control: {
    backgroundColor: '#fff',

    fontSize: 13,
    fontFamily: 'Lato',
    fontWeight: 'normal',
    minHeight: 92,
  },

  input: {
    margin: 0,
  },

  '&multiLine': {
    control: {
      lineHeight: '18px',
    },

    highlighter: {
      padding: 16,
    },

    input: {
      padding: 16,
      outline: 0,
      border: 0,
      color: '#616669',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      borderRadius: 4,
      boxShadow: '0 1px 5px 0 rgba(60, 92, 129, 0.2)',
      padding: 5,
    },

    item: {
      fontSize: 12,
      padding: '5px',

      '&focused': {
        backgroundColor: '#34569B',
        borderRadius: 3,
        color: '#fff',
      },
    },
  },
});
