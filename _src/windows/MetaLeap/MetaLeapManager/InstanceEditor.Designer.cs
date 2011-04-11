namespace MetaLeapManager {
	partial class InstanceEditor {
		/// <summary> 
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary> 
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose (bool disposing) {
			if (disposing && (components != null)) {
				components.Dispose ();
			}
			base.Dispose (disposing);
		}

		#region Component Designer generated code

		/// <summary> 
		/// Required method for Designer support - do not modify 
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent () {
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager (typeof (InstanceEditor));
			this.tabControl1 = new System.Windows.Forms.TabControl ();
			this.tabPage1 = new System.Windows.Forms.TabPage ();
			this.tabPage2 = new System.Windows.Forms.TabPage ();
			this.tabPage3 = new System.Windows.Forms.TabPage ();
			this.toolStrip = new System.Windows.Forms.ToolStrip ();
			this.toolStripLabel1 = new System.Windows.Forms.ToolStripLabel ();
			this.toolStripTextBox1 = new System.Windows.Forms.ToolStripTextBox ();
			this.toolStripButton1 = new System.Windows.Forms.ToolStripDropDownButton ();
			this.tabControl1.SuspendLayout ();
			this.toolStrip.SuspendLayout ();
			this.SuspendLayout ();
			// 
			// tabControl1
			// 
			resources.ApplyResources (this.tabControl1, "tabControl1");
			this.tabControl1.Controls.Add (this.tabPage1);
			this.tabControl1.Controls.Add (this.tabPage2);
			this.tabControl1.Controls.Add (this.tabPage3);
			this.tabControl1.Name = "tabControl1";
			this.tabControl1.SelectedIndex = 0;
			// 
			// tabPage1
			// 
			resources.ApplyResources (this.tabPage1, "tabPage1");
			this.tabPage1.Name = "tabPage1";
			this.tabPage1.UseVisualStyleBackColor = true;
			// 
			// tabPage2
			// 
			resources.ApplyResources (this.tabPage2, "tabPage2");
			this.tabPage2.Name = "tabPage2";
			this.tabPage2.UseVisualStyleBackColor = true;
			// 
			// tabPage3
			// 
			resources.ApplyResources (this.tabPage3, "tabPage3");
			this.tabPage3.Name = "tabPage3";
			this.tabPage3.UseVisualStyleBackColor = true;
			// 
			// toolStrip
			// 
			this.toolStrip.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
			this.toolStrip.Items.AddRange (new System.Windows.Forms.ToolStripItem [] {
            this.toolStripLabel1,
            this.toolStripTextBox1,
            this.toolStripButton1});
			resources.ApplyResources (this.toolStrip, "toolStrip");
			this.toolStrip.Name = "toolStrip";
			// 
			// toolStripLabel1
			// 
			this.toolStripLabel1.Name = "toolStripLabel1";
			resources.ApplyResources (this.toolStripLabel1, "toolStripLabel1");
			// 
			// toolStripTextBox1
			// 
			this.toolStripTextBox1.Name = "toolStripTextBox1";
			resources.ApplyResources (this.toolStripTextBox1, "toolStripTextBox1");
			// 
			// toolStripButton1
			// 
			this.toolStripButton1.Alignment = System.Windows.Forms.ToolStripItemAlignment.Right;
			this.toolStripButton1.Image = global::MetaLeapManager.Properties.Resources.img_Delete;
			resources.ApplyResources (this.toolStripButton1, "toolStripButton1");
			this.toolStripButton1.Name = "toolStripButton1";
			// 
			// InstanceEditor
			// 
			resources.ApplyResources (this, "$this");
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.Controls.Add (this.tabControl1);
			this.Controls.Add (this.toolStrip);
			this.Name = "InstanceEditor";
			this.tabControl1.ResumeLayout (false);
			this.toolStrip.ResumeLayout (false);
			this.toolStrip.PerformLayout ();
			this.ResumeLayout (false);
			this.PerformLayout ();

		}

		#endregion

		private System.Windows.Forms.TabControl tabControl1;
		private System.Windows.Forms.TabPage tabPage1;
		private System.Windows.Forms.TabPage tabPage2;
		private System.Windows.Forms.ToolStrip toolStrip;
		private System.Windows.Forms.ToolStripLabel toolStripLabel1;
		private System.Windows.Forms.ToolStripTextBox toolStripTextBox1;
		private System.Windows.Forms.ToolStripDropDownButton toolStripButton1;
		private System.Windows.Forms.TabPage tabPage3;
	}
}
