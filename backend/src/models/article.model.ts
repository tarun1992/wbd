import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  articleId: { type: String, required: true, unique: true },
  title: String,
  source: String,
  url: String,
  importedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Article', ArticleSchema);
