const AWS = require('aws-sdk');
const region = "ap-south-1";

const s3 = new AWS.S3({region : region});
module.exports.s3Bucket = "test-upload-users";
module.exports.saveArraytoS3 = async(array:any, key:any, s3bucket:any) =>{
    // Use first element to choose the keys and the order
    let keys = Object.keys(array[0]);
  
    // Build header
    let result = keys.join(",") + "\n";
  
    // Add the rows
    array.forEach(function(obj:any){
      result += keys.map(k => obj[k]).join(",") + "\n";
    });
    console.log('s3B', s3bucket);
    try {
        const res = await s3.putObject({
            Bucket: s3bucket,
            Key: key,
            Body: result
        }).promise();
        return console.log("file upload result::", res, s3bucket, key);
    }
    catch (err) {
        return console.log(err);
    }
  }