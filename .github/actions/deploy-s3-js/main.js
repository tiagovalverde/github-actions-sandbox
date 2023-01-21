const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec')

async function run() {
  core.notice('Hello from my custom JS Action');

  // extract action inputs
  const bucketName = core.getInput('bucket', { required: true });
  const bucketRegion = core.getInput('bucket-region', { required: true });
  const distFolder = core.getInput('dist-folder', { required: false });

  // exec packgage over aws sdk package
  // aws cli interface already installed in ubuntu images
  // Octokit client available in ubuntu image as well

  // upload files
  const s3Uri = `s3://${bucketName}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  const websiteUrl = `http://${bucketName}.s3-website-${bucketRegion}.amazonaws.com`
  // ::set-output
  core.setOutput('website-url', websiteUrl);
}

run();