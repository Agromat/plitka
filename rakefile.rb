task :default do
    # Compile both expanded and compressed variations
    compressedDir = File.join(File.dirname(__FILE__), 'css/compressed')

    sh "compass compile --output-style compressed --force --css-dir #{compressedDir}"
end