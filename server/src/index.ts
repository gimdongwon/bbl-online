import routes from './routes';
import app from './app';
const PORT = process.env.PORT || 5001;

// 라우트 등록
app.use('/api', routes);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('BBL-Online API is running!');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
