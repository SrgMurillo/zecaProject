const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'seu_banco'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL');
});

// CRUD para Equipes
app.get('/equipes', (req, res) => {
    db.query('SELECT * FROM equipes', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/equipes', (req, res) => {
    const { nome, data_inicio, fixo, rotativo0, rotativo1, rotativo2 } = req.body;
    const sql = 'INSERT INTO equipes (nome, data_inicio, fixo, rotativo0, rotativo1, rotativo2) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [nome, data_inicio, fixo, rotativo0, rotativo1, rotativo2], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId });
    });
});

app.put('/equipes/:id', (req, res) => {
    const { nome, data_inicio, fixo, rotativo0, rotativo1, rotativo2 } = req.body;
    const sql = 'UPDATE equipes SET nome=?, data_inicio=?, fixo=?, rotativo0=?, rotativo1=?, rotativo2=? WHERE id=?';
    db.query(sql, [nome, data_inicio, fixo, rotativo0, rotativo1, rotativo2, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

app.delete('/equipes/:id', (req, res) => {
    db.query('DELETE FROM equipes WHERE id=?', [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.sendStatus(200);
    });
});

// CRUD para Funcionarios
app.get('/funcionarios', (req, res) => {
    db.query('SELECT * FROM funcionarios', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/funcionarios', (req, res) => {
    const { nome, cargo, situacao } = req.body;
    db.query('INSERT INTO funcionarios (nome, cargo, situacao) VALUES (?, ?, ?)', [nome, cargo, situacao], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId });
    });
});

// CRUD para Afastamentos
app.get('/afastamentos', (req, res) => {
    db.query('SELECT * FROM afastamentos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/afastamentos', (req, res) => {
    const { id_funcionario, data_inicio, data_fim, motivo } = req.body;
    db.query('INSERT INTO afastamentos (id_funcionario, data_inicio, data_fim, motivo) VALUES (?, ?, ?, ?)', [id_funcionario, data_inicio, data_fim, motivo], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId });
    });
});

// CRUD para Escala
app.get('/escala', (req, res) => {
    db.query('SELECT * FROM escala', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/escala', (req, res) => {
    const { id_funcionario, data, turno } = req.body;
    db.query('INSERT INTO escala (id_funcionario, data, turno) VALUES (?, ?, ?)', [id_funcionario, data, turno], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
