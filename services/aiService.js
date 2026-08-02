const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
});

exports.analyzeResume = async (filePath) => {
    try {

        const pdfBuffer = fs.readFileSync(filePath);

        const prompt = `
            Bạn là chuyên gia tuyển dụng.

            Hãy phân tích CV sau.

            Trả về JSON đúng định dạng:

            {
            "skills": [],
            "projects": [],
            "education": [],
            "experience": [],
            "summary": ""
            }

            Không giải thích.

            Không markdown.

            Chỉ trả JSON.
            `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: pdfBuffer.toString("base64"),
                    mimeType: "application/pdf",
                },
            },
        ]);

        const text = result.response.text();

        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        return JSON.parse(cleanText);

    } catch (err) {

        console.log(err);
        throw err;

    }
};

exports.analyzeJob = async (job) => {

    try {


        const prompt = `

Bạn là chuyên gia tuyển dụng AI.


Hãy phân tích thông tin tuyển dụng sau:


Tên công việc:
${job.title}


Mô tả:
${job.description}


Địa điểm:
${job.location}


Mức lương:
${job.salary}


Hình thức làm việc:
${job.employmentType}


Kinh nghiệm:
${job.experience}



Hãy trả về JSON đúng format:


{
    "skills": [],
    "experience": "",
    "education": "",
    "summary": ""
}


Yêu cầu:

- skills: danh sách kỹ năng cần thiết
- experience: yêu cầu kinh nghiệm
- education: yêu cầu học vấn
- summary: tóm tắt công việc


Không markdown.

Không giải thích.

Chỉ trả JSON.

`;



        const result = await model.generateContent(prompt);



        const text = result.response.text();



        const cleanText = text

            .replace(/```json/g, "")

            .replace(/```/g, "")

            .trim();



        return JSON.parse(cleanText);



    } catch(err){


        console.log(err);

        throw err;


    }

};

exports.matchResumeAndJob = async (resumeAI, jobAI) => {

    const prompt = `
        Bạn là chuyên gia tuyển dụng.

        Hãy so sánh Resume và Job.

        Resume:

        ${JSON.stringify(resumeAI)}

        Job:

        ${JSON.stringify(jobAI)}

        Trả về JSON:

        {
            "score":0,
            "matchedSkills":[],
            "missingSkills":[],
            "strengths":[],
            "weaknesses":[],
            "suggestions":[]
        }

        Không markdown.

        Không giải thích.

        Chỉ JSON.
        `;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const clean = text
        .replace(/```json/g,"")
        .replace(/```/g,"")
        .trim();

    return JSON.parse(clean);

}