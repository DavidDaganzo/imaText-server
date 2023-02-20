const router = require("express").Router()
const { Configuration, OpenAIApi } = require('openai');


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
  const { prompt, imgSide } = req.body;
  console.log('imgSide:', imgSide)

  const imageSize =
    imgSide === 'small' ? '256x256' : imgSide === 'medium' ? '512x512' : '1024x1024';
  console.log('imageSize:', imageSize)
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });
    const imageUrl = response.data.data[0].url;


    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
});

module.exports = router;
