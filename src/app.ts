import path from 'path';
import express from 'express';
import { envConstants } from 'core/constants';
import { createApp } from 'core/servers';
import { connectToDB } from 'core/database';
import { memberApi } from 'pods/member';

const app = createApp();

const staticFilesPath = path.resolve(__dirname, process.env.STATIC_FILES_PATH);
app.use('/', express.static(staticFilesPath));

app.use('/members', memberApi);

app.listen(envConstants.PORT, async () => {
  await connectToDB(envConstants.MONGODB_URI);
  console.log(`Server ready at PORT ${envConstants.PORT}`);
});
