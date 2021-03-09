import { FileManager } from './FileManager';

describe('FileManager', () => {
  const fileManager: FileManager = new FileManager();

  it('works', () => {
    expect(fileManager).toBeDefined();
    expect(fileManager).toBeInstanceOf(FileManager);
  });
});
