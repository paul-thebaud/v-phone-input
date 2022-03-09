describe('Coverage', () => {
  it('should import serve without error', async () => {
    // This test will only fix coverage issue
    // (merging coverage might mark imports and templates as uncovered).
    const appDiv = document.createElement('div');
    appDiv.id = 'app';
    document.body.appendChild(appDiv);

    await import('../../dev/serve');
  });
});
