const generateSlug = require('../../../server/utils/slugify');

const MockUser = {
  slugs: ['aristah-joseph', 'aristah-joseph-1', 'makini'],
  findOne({ slug }) {
    if (this.slugs.includes(slug)) {
      return Promise.resolve({ id: 'id' });
    }

    return Promise.resolve(null);
  },
};

describe('slugify', () => {
  test('no duplication', () => {
    expect.assertions(1);

    return generateSlug(MockUser, 'Aristah Joseph.').then((slug) => {
      expect(slug).toBe('john-jonhson');
    });
  });

  test('one duplication', () => {
    expect.assertions(1);

    return generateSlug(MockUser, 'Aristah.').then((slug) => {
      expect(slug).toBe('aristah-1');
    });
  });

  test('multiple duplications', () => {
    expect.assertions(1);

    return generateSlug(MockUser, 'Aristah Joseph snr.').then((slug) => {
      expect(slug).toBe('aristah-joseph-snr2');
    });
  });
});
