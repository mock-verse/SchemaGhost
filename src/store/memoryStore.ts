// Simple in-memory data store

export class MemoryStore {
  private data: Record<string, any[]> = {};

  getAll(model: string) {
    return this.data[model] || [];
  }

  getById(model: string, id: any) {
    return (this.data[model] || []).find(item => item.id === id);
  }

  create(model: string, record: any) {
    if (!this.data[model]) this.data[model] = [];
    this.data[model].push(record);
    return record;
  }

  update(model: string, id: any, updates: any) {
    const items = this.data[model];
    if (!items) return null;
    const idx = items.findIndex(item => item.id === id);
    if (idx === -1) return null;
    items[idx] = { ...items[idx], ...updates };
    return items[idx];
  }

  delete(model: string, id: any) {
    const items = this.data[model];
    if (!items) return false;
    const idx = items.findIndex(item => item.id === id);
    if (idx === -1) return false;
    items.splice(idx, 1);
    return true;
  }
}
