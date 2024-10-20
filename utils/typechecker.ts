export async function checkTypeScript(code: string): Promise<string> {
  const tempFile = await Deno.makeTempFile({ suffix: '.ts' });
  try {
    await Deno.writeTextFile(tempFile, code);

    const command = new Deno.Command('deno', {
      args: ['check', tempFile],
      stderr: 'piped',
    });

    const { stderr } = await command.output();
    const errorOutput = new TextDecoder().decode(stderr);

    return errorOutput.trim() || 'No type errors found.';
  } finally {
    await Deno.remove(tempFile);
  }
}
