namespace SmoothioMonitor {
	partial class InstanceSummary {
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
			this.groupBox = new System.Windows.Forms.GroupBox ();
			this.listView = new System.Windows.Forms.ListView ();
			this.listViewNameColumn = ((System.Windows.Forms.ColumnHeader) (new System.Windows.Forms.ColumnHeader ()));
			this.listViewUrlColumn = ((System.Windows.Forms.ColumnHeader) (new System.Windows.Forms.ColumnHeader ()));
			this.groupBox.SuspendLayout ();
			this.SuspendLayout ();
			// 
			// groupBox
			// 
			this.groupBox.Controls.Add (this.listView);
			this.groupBox.Dock = System.Windows.Forms.DockStyle.Fill;
			this.groupBox.Location = new System.Drawing.Point (0, 0);
			this.groupBox.Name = "groupBox";
			this.groupBox.Size = new System.Drawing.Size (632, 216);
			this.groupBox.TabIndex = 0;
			this.groupBox.TabStop = false;
			this.groupBox.Text = "\'default\' Instance";
			// 
			// listView
			// 
			this.listView.Columns.AddRange (new System.Windows.Forms.ColumnHeader [] {
            this.listViewNameColumn,
            this.listViewUrlColumn});
			this.listView.Dock = System.Windows.Forms.DockStyle.Fill;
			this.listView.FullRowSelect = true;
			this.listView.GridLines = true;
			this.listView.HeaderStyle = System.Windows.Forms.ColumnHeaderStyle.Nonclickable;
			this.listView.HideSelection = false;
			this.listView.Location = new System.Drawing.Point (3, 16);
			this.listView.Name = "listView";
			this.listView.Size = new System.Drawing.Size (626, 197);
			this.listView.TabIndex = 0;
			this.listView.UseCompatibleStateImageBehavior = false;
			this.listView.View = System.Windows.Forms.View.Details;
			// 
			// listViewNameColumn
			// 
			this.listViewNameColumn.Text = "Database Name";
			this.listViewNameColumn.Width = 300;
			// 
			// listViewUrlColumn
			// 
			this.listViewUrlColumn.Text = "URL";
			this.listViewUrlColumn.Width = 300;
			// 
			// InstanceSummary
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF (6F, 13F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.Controls.Add (this.groupBox);
			this.Name = "InstanceSummary";
			this.Size = new System.Drawing.Size (632, 216);
			this.groupBox.ResumeLayout (false);
			this.ResumeLayout (false);

		}

		#endregion

		private System.Windows.Forms.GroupBox groupBox;
		private System.Windows.Forms.ListView listView;
		private System.Windows.Forms.ColumnHeader listViewNameColumn;
		private System.Windows.Forms.ColumnHeader listViewUrlColumn;
	}
}
