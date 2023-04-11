import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider";
// Uses S3 module defined in cdktf.json
import { S3 } from "./.gen/modules/s3";
// Uses variables from variables.json
// Want to come up with a better way to do this
import vars from "./variables.json"

class ModuleStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);


    new AwsProvider(this, "aws", {
      region: vars.region,
      // This is a set of default tags that will be applied to all resources that support tags.
      // Tags defined with a resource override the default set here.
      // This is primarily shown as an example. Actual default tag management should be handled in a more elegant fashion. 
      defaultTags: [
        {
          tags: {
            environment: "dev",
            terraform: "true",
            cdk: "true",
          },
        },
      ],
    });

    const s3 = new S3(this, "bucket", {
      name: vars.bucketName,
    });

    new TerraformOutput(this, "bucketIdOutput", {
      value: s3.bucketIdOutput
    });
  }
}

const app = new App();
new ModuleStack(app, "s3-bucket");
app.synth();
