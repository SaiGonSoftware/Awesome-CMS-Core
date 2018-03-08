using Microsoft.CSharp;
using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Microsoft.CodeAnalysis.CSharp.Scripting;
using Microsoft.CodeAnalysis.Scripting;
using System.IO;
using System.Linq;
using EasyScintilla;
using EasyScintilla.Stylers;

namespace MailBodyEditor
{
    public partial class Form1 : Form
    {
        Dictionary<string, string> Templates { get; set; }
        SimpleEditor Editor;

        const string KEYWORDS = @"
            abstract	as	base	bool
            break	byte	case	catch
            char	checked	class	const
            continue	decimal	default	delegate
            do	double	else	enum
            event	explicit	extern	false
            finally	fixed	float	for
            foreach	goto	if	implicit
            in	int	interface
            internal	is	lock	long
            namespace	new	null	object
            operator	out	override
            params	private	protected	public
            readonly	ref	return	sbyte
            sealed	short	sizeof	stackalloc
            static	string	struct	switch
            this	throw	true	try
            typeof	uint	ulong	unchecked
            unsafe	ushort	using	using static
            virtual	void	volatile	while
            var";

        protected override void OnLoad(EventArgs e)
        {
            // Handle multiple screens.
            var area = Screen.AllScreens.Length > 1 ? Screen.AllScreens[1].WorkingArea : Screen.PrimaryScreen.WorkingArea;
            this.Location = new Point((area.Width - this.Width) / 2, (area.Height - this.Height) / 2);
            base.OnLoad(e);
        }
        
        public Form1()
        {
            InitializeComponent();

            Editor = new SimpleEditor();
            Editor.Dock = DockStyle.Fill;
            Editor.Name = "Editor";
            CSharpStyler styler = new CSharpStyler();
            Editor.Styler = styler;
            Editor.SetKeywords(0, KEYWORDS);
            Editor.TextChanged += textBoxCode_TextChangedAsync;
            panelCodeEditor.Controls.Add(Editor);

            // Load templates from directory.
            Templates = GetTemplates().ToDictionary(m => m, m => m);
            comboBoxQuickTemplate.DataSource = new BindingSource(Templates, null);
            comboBoxQuickTemplate.DisplayMember = "Value";
            comboBoxQuickTemplate.ValueMember = "Key";

            // Get ready to work.
            //textBoxCode.SelectionStart = textBoxCode.TextLength;
            //textBoxCode.ScrollToCaret();
        }

        private async void textBoxCode_TextChangedAsync(object sender, EventArgs e)
        {
            StringBuilder builder = new StringBuilder();
            try
            {
                var mainDir = GetMainDirectory();
                var header = File.ReadAllText(mainDir + "/Templates/_Header.txt");
                var footer = File.ReadAllText(mainDir + "/Templates/_Footer.txt");
                var sourceCode = header + GetSourceCode() + footer;

                builder.Append(await CSharpScript.EvaluateAsync(sourceCode,
                    ScriptOptions.Default.WithReferences(typeof(MailBodyPack.MailBody).Assembly)));
            }
            catch (CompilationErrorException ex)
            {
                builder.Append("<span style='color:red'>" + string.Join("<br />", ex.Diagnostics) + "</span>");
            }

            previewBox.DocumentText = builder.ToString();
        }

        private static string GetMainDirectory()
        {
            return Directory.GetParent(Directory.GetCurrentDirectory()).Parent.FullName;
        }

        private IEnumerable<string> GetTemplates()
        {
            var mainDir = GetMainDirectory();
            return Directory.EnumerateFiles(mainDir + "/Templates")
                .Select(m => Path.GetFileNameWithoutExtension(m))
                .Where(m => m != "_Footer" && m != "_Header");
        }

        private void comboBoxQuickTemplate_SelectionChanged(object sender, EventArgs e)
        {
            var selectedText = (comboBoxQuickTemplate.Text);

            // Quick fix on load: The text is not well formatted.
            selectedText = selectedText.Replace("[", "");
            selectedText = selectedText.Replace("]", "");
            selectedText = selectedText.Split(',')[0].Trim();

            if (GetTemplates().Contains(selectedText))
            {
                // Seem legit.
                var mainDir = GetMainDirectory();
                var template = File.ReadAllText(mainDir + "/Templates/" + selectedText + ".txt");
                SetSourceCode(template);
            }
        }

        private bool EnsureTemplateNameIsNotEmpty()
        {
            if (string.IsNullOrWhiteSpace(comboBoxQuickTemplate.Text))
            {
                MessageBox.Show("Missing template name", "Error",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
                return false;
            }
            return true;
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            // Create or save on template folder
            if (EnsureTemplateNameIsNotEmpty())
            {
                var mainDir = GetMainDirectory();
                File.WriteAllText(mainDir + "/Templates/" + comboBoxQuickTemplate.Text + ".txt",
                    GetSourceCode());
            }
        }

        private void saveAs_Click(object sender, EventArgs e)
        {
            // Save as (create)
            if (EnsureTemplateNameIsNotEmpty())
            {
                string value = "";
                DialogResult result = InputBox("Save As...", "Enter the new template name", ref value);
                if (result == DialogResult.OK)
                {
                    var mainDir = GetMainDirectory();
                    File.WriteAllText(mainDir + "/Templates/" + value + ".txt",
                        GetSourceCode());
                    UpdateTemplateSelection(value);
                }
            }
        }

        private void UpdateTemplateSelection(string newSelection = "")
        {
            Templates = GetTemplates().ToDictionary(m => m, m => m);
            comboBoxQuickTemplate.DataSource = new BindingSource(Templates, null);
            if (!string.IsNullOrWhiteSpace(newSelection))
            {
                comboBoxQuickTemplate.Text = newSelection;
            }
        }

        private void btnRemove_Click(object sender, EventArgs e)
        {
            // Remove
            DialogResult result = MessageBox.Show("Are you sure you want to remove the template?", "Confirmation", MessageBoxButtons.YesNo);
            if (result == DialogResult.Yes)
            {
                var mainDir = GetMainDirectory();
                File.Delete(mainDir + "/Templates/" + comboBoxQuickTemplate.Text + ".txt");
                UpdateTemplateSelection();
            }
        }

        private void SetSourceCode(string code)
        {
            Editor.Text = code;
        }

        private string GetSourceCode()
        {
            return Editor.Text;
        }

        public static DialogResult InputBox(string title, string promptText, ref string value)
        {
            Form form = new Form();
            Label label = new Label();
            TextBox textBox = new TextBox();
            Button buttonOk = new Button();
            Button buttonCancel = new Button();

            form.Text = title;
            label.Text = promptText;
            textBox.Text = value;

            buttonOk.Text = "OK";
            buttonCancel.Text = "Cancel";
            buttonOk.DialogResult = DialogResult.OK;
            buttonCancel.DialogResult = DialogResult.Cancel;

            label.SetBounds(9, 20, 372, 13);
            textBox.SetBounds(12, 36, 372, 20);
            buttonOk.SetBounds(228, 72, 75, 23);
            buttonCancel.SetBounds(309, 72, 75, 23);

            label.AutoSize = true;
            textBox.Anchor = textBox.Anchor | AnchorStyles.Right;
            buttonOk.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;
            buttonCancel.Anchor = AnchorStyles.Bottom | AnchorStyles.Right;

            form.ClientSize = new Size(396, 107);
            form.Controls.AddRange(new Control[] { label, textBox, buttonOk, buttonCancel });
            form.ClientSize = new Size(Math.Max(300, label.Right + 10), form.ClientSize.Height);
            form.FormBorderStyle = FormBorderStyle.FixedDialog;
            form.StartPosition = FormStartPosition.CenterScreen;
            form.MinimizeBox = false;
            form.MaximizeBox = false;
            form.AcceptButton = buttonOk;
            form.CancelButton = buttonCancel;

            DialogResult dialogResult = form.ShowDialog();
            value = textBox.Text;
            return dialogResult;
        }

        private void btnReload_Click(object sender, EventArgs e)
        {
            // Seem legit.
            var mainDir = GetMainDirectory();
            var template = File.ReadAllText(mainDir + "/Templates/" + comboBoxQuickTemplate.Text + ".txt");
            SetSourceCode(template);
        }
    }
}
