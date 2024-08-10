'use server'

import { schema } from "./validation"

type ActionResponse = {
    message: string
}


// 네이밍 규칙: 동사 + (목적어) + Action
export async function submitFormAction(prevState: ActionResponse, data: FormData): Promise<ActionResponse> {
    console.log('submitFormAction called..');
    
    // converting FormData into regular js object.
    const formData = Object.fromEntries(data);

    // check if schema is valid on the server
    const parsed = schema.safeParse(formData);

    if(!parsed.success) {
        return {
            message: "제출된 폼 데이터가 유효하지 않습니다."
        }
    }

    if(parsed.data.email.includes('jean')) {
        return {
            message: "사용할 수 없는 이메일 입니다."
        }
    }

    return {
        message: "폼이 성공적으로 제출되었습니다!"
    }

}