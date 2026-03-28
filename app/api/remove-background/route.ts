import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: '请上传图片文件' },
        { status: 400 }
      );
    }

    // 检查文件类型
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '不支持的文件格式，请上传 JPG、PNG 或 WEBP 格式的图片' },
        { status: 400 }
      );
    }

    // 检查文件大小 (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '文件大小超过限制，最大支持 10MB' },
        { status: 400 }
      );
    }

    const apiKey = process.env.REMOVE_BG_API_KEY;
    
    if (!apiKey || apiKey === 'your_api_key_here') {
      return NextResponse.json(
        { error: 'API密钥未配置，请联系管理员' },
        { status: 500 }
      );
    }

    // 调用 Remove.bg API
    const formDataToSend = new FormData();
    formDataToSend.append('image_file', file);
    formDataToSend.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: formDataToSend,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Remove.bg API error:', errorData);
      
      if (response.status === 402) {
        return NextResponse.json(
          { error: 'API调用次数已达上限，请稍后再试' },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: '背景移除失败，请重试' },
        { status: 500 }
      );
    }

    // 返回处理后的图片
    const resultBuffer = await response.arrayBuffer();
    
    return new NextResponse(resultBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="removed-bg.png"',
      },
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: '服务器错误，请稍后再试' },
      { status: 500 }
    );
  }
}
