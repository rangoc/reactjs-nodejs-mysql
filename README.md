# React + NodeJS + MySQL application ( CloudFormation template )

## React on S3, NodeJS on ECS and MySQL on RDS

### Architecture:

![Architecture](https://imgur.com/RFFuGLl.png)

### Application description: 

Simple CRUD application, front-end built by using React, back-end by using NodeJS and for database MySQL was used. On front-end  table is displaying list of users from MySQL database and there are options for creating, updating, deleting the users and also getting their details. Table is primarily showing specific number of columns, while details, create and edit form give an insight into all the attributes that one user is supposed to have.

### Get it up & running: 

Before everything, make sure that you have AWS CLI installed, and of course an AWS account.

#### 1. RDS Deploy: 

Before deploying, you first need to modify [rds.yml](https://github.com/rangoc/reactjs-nodejs-mysql/blob/master/cloudformation/rds.yml) file inside of cloudformation folder, and add **DBInstanceID**, **DBName**, **DBUsername**, **DBPassword** in order for a resource to be properly created, after you've changed those, make sure that you are in a cloudformation folder in your terminal path and run the following: 

`aws cloudformation deploy --template-file rds.yml --stack-name [YOUR STACK NAME 1]`

#### 2. Deploy the [EC2 Cluster with fully public network](https://github.com/rangoc/reactjs-nodejs-mysql/blob/master/cloudformation/cluster-ec2-public-vpc.yml)

`aws cloudformation deploy --template-file cluster-ec2-public-vpc.yml  --stack-name [YOUR STACK NAME 2]`

#### 3. Deploy [the external, public ALB](https://github.com/rangoc/reactjs-nodejs-mysql/blob/master/cloudformation/alb-external.yml) ingress

`aws cloudformation deploy --template-file alb-external.yml --stack-name [YOUR STACK NAME 3]`

#### 4. Push the docker image onto ECR:
Before pushing the docker image onto ECR, you will first need to create a repository inside of ECR. Once you do that, in your ECR console you will have push commands that you have to run in your terminal in order for your image to be pushed on ECR (Note: be sure that your terminal path is in **server** folder, where your [Dockerfile](https://github.com/rangoc/reactjs-nodejs-mysql/tree/master/server) is located ). 

#### 5. Deploy the [public load balanced EC2 service template](https://github.com/rangoc/reactjs-nodejs-mysql/blob/master/cloudformation/service-ec2-public-lb.yml)

Before running the deploy command, make sure to add [Image URI](https://github.com/rangoc/reactjs-nodejs-mysql/blob/master/cloudformation/service-ec2-public-lb.yml) that you get in your ECR repository once the image has been pushed, then run: 

`aws cloudformation deploy --template-file service-ec2-public-lb.yml --stack-name [YOUR STACK NAME 4]`

#### 6. Deploy [S3](https://github.com/rangoc/reactjs-nodejs-mysql/blob/master/cloudformation/s3.yml)

`aws cloudformation deploy --template-file s3.yml --stack-name [YOUR STACK NAME 5]`

#### 7. Upload React on S3: 

Once the deployment from step 6. is done, and bucket is created on your AWS account, make sure to grab it's name and edit [deploy script](https://github.com/rangoc/reactjs-nodejs-mysql/blob/master/client/package.json) with the bucket name you just grabbed.

Next, in your AWS console, go to your Load Balancer that was created in step 3. and copy it's DNS name. You need to paste it  in **fetch link** in:[Create.js](https://github.com/rangoc/reactjs-nodejs-mysql/blob/master/client/src/Components/Create.js),[Remove.js](https://github.com/rangoc/reactjs-nodejs-mysql/blob/master/client/src/Components/Remove.js), [Edit.js](https://github.com/rangoc/reactjs-nodejs-mysql/blob/master/client/src/Components/Edit.js) and [App.js](https://github.com/rangoc/reactjs-nodejs-mysql/blob/master/client/src/App.js)

Last but not least, run the following two commands from client path in your terminal: 

`npm run build`<br/>
`npm run deploy`


That's all folks!<br/>
![Looney Tunes](https://media.giphy.com/media/5IT69msgpaOcg/giphy.gif)



