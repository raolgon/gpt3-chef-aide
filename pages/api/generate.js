import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPEN_API_KEY,
})

const openai = new OpenAIApi(configuration)


const generateAction = async (req, res) => {

    const basePromptPrefix = `
        Write me a food recepy with just the ingredients used bellow, also  make sure to pay attention to the additional requirements for the recepy at the end of the ingredients. If additinal requirements is empty ignore it

        Ingredients: ${req.body.inputIngredients}

        Additonal requirements: ${req.body.inputAdditional}
    `

    console.log(`API: ${basePromptPrefix}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}`,
        temperature: 0.8,
        max_tokens: 1500,
    })

    const basePromptOutput = baseCompletion.data.choices.pop()

    res.status(200).json({ output: basePromptOutput })
}

export default generateAction