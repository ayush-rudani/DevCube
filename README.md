# DevCube



## Environment Variable
If we wanted to store any constants like PORT, Database URL in an environment variable so sensitive information 
like this advisible to store in enviromnet variable using .env file
Don't forgot ad this dile in .gitignore


To access .env's environment variable in our code we need to do it with help of a node package called dotenv so install using `npm i dotenv`
`dontenv` package that loads environment variables from .env file into the process.env object availabe to us globally in a node js environment 

So to use it, you can access using `process.env.<variable>`