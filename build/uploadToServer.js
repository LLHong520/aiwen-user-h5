var path, node_ssh, ssh, fs;
fs = require('fs');
path = require('path');
node_ssh = require('node-ssh');
const ora = require('ora');
const chalk = require('chalk');
const process = require('child_process');
ssh = new node_ssh();

const host = '192.168.1.116';
const username = 'root';
const port = '22';
const password = 'wenwo.com';
//上传的本地路径
const localPath = __dirname+'/../dist/zt';
//要上传的远程路径
const remotePath = '/www/web_pages/zt';

const spinner = ora('上传文件中...\n').start();
// process.exec("npm run build");
// process.exec("node tt.js"); 
//连接 sftp
ssh.connect({
  host,
  username,
  port,
  password
})
.then(function() {
  spinner.color = 'yellow';
  spinner.text = '清空目标目录中...';
  return ssh.execCommand('rm -rf *', { cwd: remotePath }).then(function(result) {
    console.log(chalk.green('已清空目标目录.\n'))
    console.log(chalk.green('开始上传.\n'))
    // console.log('STDERR: ' + result.stderr)
  })
})
// //上传文件
.then(function() {
  spinner.color = 'green';
  spinner.text = '上传文件中...\n';
  ssh.putDirectory(localPath, remotePath).then(function() {
    console.log(chalk.green('所有文件都已经上传.\n'))
    spinner.color = 'green';
    spinner.text = '所有文件都已经上传';
    spinner.stop();
  }, function(error) {
      console.log(chalk.red('上传失败.\n'))
      console.log(error)
  })
})