const successMessage = (message: string) =>
  `\x1b[0m\x1b[32m${message}\x1b[0m`;

export async function checkTypeScript(code: string): Promise<void> {
  const tempFile = await Deno.makeTempFile({ suffix: '.ts' });
  try {
    await Deno.writeTextFile(tempFile, code);

    const command = new Deno.Command('deno', {
      args: ['check', tempFile],
      stderr: 'piped',
    });

    const { stderr } = await command.output();
    const errorOutput = new TextDecoder().decode(stderr).trim();

    let result;

    if (!errorOutput.includes('[ERROR]')) {
      result = successMessage('Types are correct.');
    } else {
      result = errorOutput.split('\n').slice(1).join('\n');
    }

    // We just want to see the result, and we get nicer output if we just log
    // it rather than returning it.
    console.log(result);
  } finally {
    await Deno.remove(tempFile);
  }
}
