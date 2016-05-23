function Shader()
{
    this.m_Program;
}

Shader.prototype.loadShader = function(type, shaderSrc) {

    var shader = GL.createShader(type);
    GL.shaderSource(shader, shaderSrc);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS) && !GL.isContextLost()) 
    {
        var infoLog = GL.getShaderInfoLog(shader);
        alert("Error compiling shader:\n" + infoLog);
        GL.deleteShader(shader);
        return null;
    }
    return shader;
}

Shader.prototype.initShaders = function(fragment, vertex) 
{
    var vertexShader = this.loadShader(GL.VERTEX_SHADER, vertex);
    var fragmentShader = this.loadShader(GL.FRAGMENT_SHADER, fragment);
    this.m_Program = GL.createProgram();
    GL.attachShader(this.m_Program, vertexShader);
    GL.attachShader(this.m_Program, fragmentShader);
    GL.bindAttribLocation(this.m_Program, 0, "position");
    GL.bindAttribLocation(this.m_Program, 1, "normal");
    GL.bindAttribLocation(this.m_Program, 2, "uvs");
    GL.bindAttribLocation(this.m_Program, 3, "binormal");
    GL.bindAttribLocation(this.m_Program, 4, "tangent");
    GL.linkProgram(this.m_Program);
    var linked = GL.getProgramParameter(this.m_Program, GL.LINK_STATUS);
    if (!linked && !GL.isContextLost()) 
    {
        var infoLog = GL.getProgramInfoLog(this.m_Program);
        alert("Error linking program:\n" + infoLog);
        GL.deleteProgram(this.m_Program);
        return;
    }
}