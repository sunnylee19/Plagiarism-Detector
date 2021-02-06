import * as express from 'express';
import * as fileUpload from 'express-fileupload';
import Comparison from './comparison/Comparison';
import ExportPdf from './exportpdf/ExportPdf';
import { AbstractProgram } from './program/AbstractProgram';
import { JavaScriptProgram } from './program/JavaScriptProgram';
import IComparisonReport from './report/IComparisonReport';
let cors = require('cors');

const app: express.Application = express();
const port: string = '3001';

let report: IComparisonReport;
let firstProgram: AbstractProgram;
let secondProgram: AbstractProgram;
let note: string;

app.use(cors());

app.use(express.json({ type: 'json' }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(fileUpload());

/**
 * Call to get a particular similar node identified in the two programs by id.
 */
app.get('/similarity', (req, res) => {
  const id = req.query.id;
  let similarity = report.getSimilarity(id);
  let retJson = similarity.getJson();
  retJson.prog1 = firstProgram.getListOfCode()[retJson.fileIndex1];
  retJson.prog2 = secondProgram.getListOfCode()[retJson.fileIndex2];
  res.status(200).send(retJson);
});

/**
 * Call to send the similarity report as a PDF.
 */
app.post('/export', (req, res) => {
  res.set('Content-Type', 'application/pdf');
  ExportPdf(report).pipe(res);
});

/**
 * Call to update a note to the similarity report.
 */
app.post('/note', (req, res) => {
  note = req.body.note;
  report.updateNote(note);
  res.status(200).send(report.getJson());
});

/**
 * Call to send the similarty report.
 */
app.post('/report', (req, res) => {
  let comparison = new Comparison(firstProgram, secondProgram);
  report = comparison.startComparison();
  if (note !== undefined) {
    report.updateNote(note);
  }
  res.status(200).send(report.getJson());
});

/**
 * Call to get the zipped files on the server and start parsing them for comparison.
 */
app.post('/file', async (req, res) => {
  note = '';
  firstProgram = new JavaScriptProgram(req.files.file1.data, req.files.file1.name);
  await firstProgram.getUnZippedFiles();

  secondProgram = new JavaScriptProgram(req.files.file2.data, req.files.file2.name);
  await secondProgram.getUnZippedFiles();
  res.status(200).send();
});

/* 
  Catch all route which matches any type of request on any route.
  Returns 404 not found.
  IMPORTANT: Express routes are checked sequentially and and first matching handlers is the one to respond.
             Always keep this last or all requests will result in a 404 error.
*/
app.all('*', (req, res) => {
  res.status(404).send('Not Found!')
});

app.listen(port, () => {
  console.log('Server running on localhost:' + port);
});