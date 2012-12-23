package taka.wro4j;

import com.google.javascript.jscomp.CompilationLevel;
import ro.isdc.wro.extensions.processor.js.GoogleClosureCompressorProcessor;
import ro.isdc.wro.manager.factory.standalone.DefaultStandaloneContextAwareManagerFactory;
import ro.isdc.wro.model.resource.processor.factory.ProcessorsFactory;
import ro.isdc.wro.model.resource.processor.factory.SimpleProcessorsFactory;
import ro.isdc.wro.model.resource.processor.impl.css.CssImportPreProcessor;
import ro.isdc.wro.model.resource.processor.impl.css.CssUrlRewritingProcessor;
import ro.isdc.wro.model.resource.processor.impl.css.CssVariablesProcessor;
import ro.isdc.wro.model.resource.processor.impl.css.JawrCssMinifierProcessor;
import ro.isdc.wro.model.resource.processor.impl.js.SemicolonAppenderPreProcessor;

/**
 * For consumption by the wro4j Google Closure Compiler Maven plugin.
 * A custom implementation of the bundled manager factory that uses the WHITESPACE_ONLY compilation level.
 */
public class GoogleWhitespaceOnlyStandaloneManagerFactory extends DefaultStandaloneContextAwareManagerFactory {

    @Override
    protected ProcessorsFactory newProcessorsFactory() {
        final SimpleProcessorsFactory factory = new SimpleProcessorsFactory();
        factory.addPreProcessor(new CssUrlRewritingProcessor());
        factory.addPreProcessor(new CssImportPreProcessor());
        factory.addPreProcessor(new SemicolonAppenderPreProcessor());
        factory.addPreProcessor(new GoogleClosureCompressorProcessor(CompilationLevel.WHITESPACE_ONLY));
        factory.addPreProcessor(new JawrCssMinifierProcessor());

        factory.addPostProcessor(new CssVariablesProcessor());
        return factory;
    }
}
