## Flow Formbuilder

- Form will be created using `@cldcvr/flow-core` elements.

### Features ( compared to our flow v1 formbuilder + all other open source formbuilder.)
- Full typescript support. (Typescript reduces all compile time errors)
- It accepts `field` and `values` in separate props for better DX.
- `field` and `values` supports nested data that means any type of values we can build through formbuilder.
  - For example i want to generate `values` like below
    ```Javascript
		{
			firstname:"Tony",
			lastname:"Stark",
			hobbies:["cricket","football"],
			addresses:[
				{
					houseno:"101",
					street:"MGRoad",
					city:"Pune"
				},
				{
					houseno:"401",
					street:"Prabhat Road",
					city:"Thane"
				}
			]
		}
	```

	Then my field will look like this
	```Javascript
	{
		type:"object",
		direction:"vertical",
		fields:{
			firstname:{
				type:"text"
			},
			lastname:{
				type:"text"
			},
			hobbies:{
				type:"array",
				field:{
					type:"text"
				}
			},
			addresses:{
				type:"array",
				field:{
					type:"object",
					fields:{
						houseno:{
							type:"text"
						},
						street:{
							type:"text"
						},
						city:{
							type:"text"
						}
					}
				}
			},
		}
	}
	```
- Baked with built in validaiton module, which supports `custom` validaiton for advanced usecases.
- With the help of `array` field, we can build dynamic add/remove feature.
- It saves 50 - 60% of devs time for building any form related use cases.

### Features inherited from `flow-core`
- Framework agnostic.
- Themeable (out-of-the-boxdark and light supported) 