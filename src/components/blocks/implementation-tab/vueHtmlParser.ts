import { h, type VNode } from 'vue'

interface ASTNode {
  type: 'element' | 'text'
}

interface ElementNode extends ASTNode {
  type: 'element'
  tag: string
  attributes: Record<string, string | boolean>
  children: ASTNode[]
}

interface TextNode extends ASTNode {
  type: 'text'
  content: string
}

interface Attribute {
  name: string
  value: string | boolean
}

type ParsedNode = ElementNode | TextNode | null

// Vue 3 render function types
type RenderFunction = (h: CreateElementFunction) => VNode
type CreateElementFunction = (
  tag: string | Component,
  props?: Record<string, any> | null,
  children?: VNode | VNode[] | string | null
) => VNode
type Component = any

class VueHtmlParser {
  private pos: number
  private input: string

  constructor() {
    this.pos = 0
    this.input = ''
  }

  parse(html: string): RenderFunction {
    this.input = html.trim()
    this.pos = 0
    const ast = this.parseElement()
    return this.astToRenderFunction(ast)
  }

  // Also provide a method to get the string representation for debugging
  parseToString(html: string): string {
    this.input = html.trim()
    this.pos = 0
    const ast = this.parseElement()
    return this.astToRenderFunctionString(ast)
  }

  // Tokenizer methods
  private peek(): string {
    return this.input[this.pos]
  }

  private advance(): string {
    return this.input[this.pos++]
  }

  private skipWhitespace(): void {
    while (this.pos < this.input.length && /\s/.test(this.peek())) {
      this.advance()
    }
  }

  private parseElement(): ParsedNode {
    this.skipWhitespace()

    if (this.peek() !== '<') {
      return this.parseTextNode()
    }

    this.advance() // consume '<'

    // Check for closing tag
    if (this.peek() === '/') {
      return null
    }

    const tagName = this.parseTagName()
    const attributes = this.parseAttributes()

    this.skipWhitespace()

    // Check for self-closing tag
    if (this.peek() === '/' && this.input[this.pos + 1] === '>') {
      this.advance() // consume '/'
      this.advance() // consume '>'
      return {
        type: 'element',
        tag: tagName,
        attributes,
        children: []
      }
    }

    if (this.peek() === '>') {
      this.advance() // consume '>'
    }

    const children = this.parseChildren(tagName)

    return {
      type: 'element' as const,
      tag: tagName,
      attributes,
      children
    }
  }

  private parseTagName(): string {
    let tagName = ''
    while (this.pos < this.input.length && /[a-zA-Z0-9-]/.test(this.peek())) {
      tagName += this.advance()
    }
    return tagName
  }

  private parseAttributes(): Record<string, string | boolean> {
    const attributes: Record<string, string | boolean> = {}

    while (this.pos < this.input.length) {
      this.skipWhitespace()

      if (this.peek() === '>' || (this.peek() === '/' && this.input[this.pos + 1] === '>')) {
        break
      }

      const attr = this.parseAttribute()
      if (attr) {
        attributes[attr.name] = attr.value
      }
    }

    return attributes
  }

  private parseAttribute(): Attribute | null {
    let name = ''

    // Parse attribute name
    while (this.pos < this.input.length && /[a-zA-Z0-9-:@]/.test(this.peek())) {
      name += this.advance()
    }

    if (!name) return null

    this.skipWhitespace()

    if (this.peek() !== '=') {
      return { name, value: true } // Boolean attribute
    }

    this.advance() // consume '='
    this.skipWhitespace()

    const value = this.parseAttributeValue()

    return { name, value }
  }

  private parseAttributeValue(): string {
    const quote = this.peek()

    if (quote !== '"' && quote !== "'") {
      // Unquoted value
      let value = ''
      while (this.pos < this.input.length && !/[\s>]/.test(this.peek())) {
        value += this.advance()
      }
      return value
    }

    this.advance() // consume opening quote
    let value = ''

    while (this.pos < this.input.length && this.peek() !== quote) {
      if (this.peek() === '\\') {
        this.advance() // consume backslash
        value += this.advance() // add escaped character
      } else {
        value += this.advance()
      }
    }

    if (this.peek() === quote) {
      this.advance() // consume closing quote
    }

    return value
  }

  private parseChildren(tagName: string): ASTNode[] {
    const children: ASTNode[] = []

    while (this.pos < this.input.length) {
      this.skipWhitespace()

      if (this.pos >= this.input.length) break

      // Check for closing tag
      if (this.peek() === '<' && this.input[this.pos + 1] === '/') {
        // Parse closing tag
        this.advance() // consume '<'
        this.advance() // consume '/'

        let closingTagName = ''
        while (this.pos < this.input.length && this.peek() !== '>') {
          closingTagName += this.advance()
        }

        if (this.peek() === '>') {
          this.advance() // consume '>'
        }

        if (closingTagName === tagName) {
          break
        }
      }

      const child = this.parseElement()
      if (child) {
        children.push(child)
      }
    }

    return children
  }

  private parseTextNode(): TextNode | null {
    let text = ''

    while (this.pos < this.input.length && this.peek() !== '<') {
      text += this.advance()
    }

    text = text.trim()

    if (!text) return null

    return {
      type: 'text' as const,
      content: text
    }
  }

  // AST to render function conversion
  private astToRenderFunction(ast: ParsedNode): RenderFunction {
    return (h: CreateElementFunction) => {
      return this.astToVNode(ast, h)
    }
  }

  private astToVNode(ast: ParsedNode, h: CreateElementFunction): VNode {
    if (!ast) return null

    if (ast.type === 'text') {
      return ast.content
    }

    if (ast.type === 'element') {
      const tag = ast.tag
      const props = this.attributesToProps(ast.attributes)
      const children = this.childrenToVNodes(ast.children, h)

      if (children !== null && children !== undefined) {
        return h(tag, props, children)
      } else {
        return h(tag, props)
      }
    }

    return null
  }

  // Keep the string version for debugging/testing
  private astToRenderFunctionString(ast: ParsedNode): string {
    if (!ast) return ''

    if (ast.type === 'text') {
      return `'${ast.content.replace(/'/g, "\\'")}'`
    }

    if (ast.type === 'element') {
      const tag = `'${ast.tag}'`
      const props = this.attributesToPropsString(ast.attributes)
      const children = this.childrenToRenderFunctionString(ast.children)

      if (children) {
        return `h(${tag}, ${props}, ${children})`
      } else {
        return `h(${tag}, ${props})`
      }
    }

    return ''
  }

  private attributesToProps(
    attributes: Record<string, string | boolean>
  ): Record<string, any> | null {
    if (!attributes || Object.keys(attributes).length === 0) {
      return null
    }

    const props: Record<string, any> = {}

    for (const [name, value] of Object.entries(attributes)) {
      if (name === 'class') {
        // Handle class attribute specially
        if (typeof value === 'string') {
          const classes = value
            .trim()
            .split(/\s+/)
            .filter((c) => c)
          if (classes.length === 1) {
            props.class = classes[0]
          } else {
            props.class = classes
          }
        }
      } else if (name.startsWith(':')) {
        // Dynamic binding - for now, store as string but could be enhanced to evaluate
        const propName = name.slice(1) // Remove the ':'
        props[propName] = value // In a real implementation, you'd evaluate this
      } else if (name.startsWith('@')) {
        // Event listener
        const eventName = 'on' + name.slice(1).charAt(0).toUpperCase() + name.slice(2)
        props[eventName] = value // In a real implementation, this would be a function
      } else if (value === true) {
        // Boolean attribute
        props[name] = true
      } else {
        // String attribute
        props[name] = value
      }
    }

    return props
  }

  private childrenToVNodes(children: ASTNode[], h: CreateElementFunction): VNode | VNode[] | null {
    if (!children || children.length === 0) {
      return null
    }

    const childVNodes = children
      .map((child) => this.astToVNode(child, h))
      .filter((vnode) => vnode !== null && vnode !== undefined)

    if (childVNodes.length === 0) {
      return null
    }

    if (childVNodes.length === 1) {
      return childVNodes[0]
    }

    return childVNodes
  }

  // String version methods for backwards compatibility and debugging
  private attributesToPropsString(attributes: Record<string, string | boolean>): string {
    if (!attributes || Object.keys(attributes).length === 0) {
      return '{}'
    }

    const props: Record<string, string> = {}

    for (const [name, value] of Object.entries(attributes)) {
      if (name === 'class') {
        // Handle class attribute specially
        if (typeof value === 'string') {
          const classes = value
            .trim()
            .split(/\s+/)
            .filter((c) => c)
          if (classes.length === 1) {
            props.class = `'${classes[0]}'`
          } else {
            props.class = `[${classes.map((c) => `'${c}'`).join(', ')}]`
          }
        }
      } else if (name.startsWith(':')) {
        // Dynamic binding
        props[`'${name}'`] = `"${value.toString().replace(/"/g, '\\"')}"`
      } else if (name.startsWith('@')) {
        // Event listener
        props[`'${name}'`] = value.toString()
      } else if (value === true) {
        // Boolean attribute
        props[name] = 'true'
      } else {
        // String attribute
        props[name] = `'${value.toString().replace(/'/g, "\\'")}'`
      }
    }

    const propEntries = Object.entries(props).map(([key, val]) => {
      const propKey = key.startsWith("'") ? key : `'${key}'`
      return `${propKey}: ${val}`
    })

    return `{ ${propEntries.join(', ')} }`
  }

  private childrenToRenderFunctionString(children: ASTNode[]): string | null {
    if (!children || children.length === 0) {
      return null
    }

    const childrenCode = children
      .map((child) => this.astToRenderFunction(child))
      .filter((code) => code)

    if (childrenCode.length === 0) {
      return null
    }

    if (childrenCode.length === 1) {
      return childrenCode[0]
    }

    return `[ ${childrenCode.join(', ')} ]`
  }
}

export const parseVueHtml = (html: string) => {
  const parser = new VueHtmlParser()
  const renderFunction = parser.parse(html)

  // Return a component-like object that Vue can render
  return {
    render() {
      return renderFunction(h)
    }
  }
}
